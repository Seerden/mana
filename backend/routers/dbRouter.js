import { dbConn } from '../db/db.js'
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import 'dotenv/config.js';
import session from 'express-session';
import passport from '../auth/passport.js';

import bcrypt from 'bcryptjs';
const { hash } = bcrypt;

const User = dbConn.model('User');
const List = dbConn.model('List');

/**
 * Express router for /db routes, used as API endpoints for frontend interaction with the database.
 */
export const dbRouter = express.Router();
dbRouter.use(bodyParser.urlencoded({ extended: true }));
dbRouter.use(bodyParser.json());
dbRouter.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000*3600*24,  // TTL in milliseconds
        // secure: true // only set once I have https setup look at docs for handy if statement to set this only for production
    },
    // store: @todo add mongo connect
    resave: true,
    saveUninitialized: true,
    rolling: true,
}))
dbRouter.use(passport.initialize());
dbRouter.use(passport.session());

/**
 * Route middleware to check if passport has authenticated the request. 
 * @note Restricting route access to only specified user still needs to be done per-route, though, since the username can be sent from frontend in various ways
 * @return send 404 response it not validated, else call next() 
 */
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(401).send('Request made by unauthorized user')
        return;
    }
    next()
}

function userOwnsRoute(req, res, next) {
    if (req.params.username === req.user.username) {
        next()
    } else {
        res.status(403).json('User does not own this route.')
    }
}

dbRouter.get('/list/devpopulate', (req, res) => {
    const base = path.join(__dirname, '../dev/wrts');
    const filenames = fs.readdirSync(base)
    const jsonFiles = filenames.filter(f => f.includes('json'))

    const populate = async () => {
        for (let file of jsonFiles) {
            let data = fs.readFileSync((path.join(base, file)), 'UTF-8');
            let { name, content, from, to } = JSON.parse(data);
            content = content.filter(i => (i.from !== null && i.to !== null))
            const newList = new List({
                owner: 'seerden',
                name,
                from: from || 'Japanese',
                to: to || "English",
                created: new Date(),
                numTerms: content.length,
                content
            })

            newList.save((err, saved) => {
                if (!err) {
                    User.findOneAndUpdate({ username: 'seerden' }, { $push: { lists: newList } }, (err, updated) => {
                        if (!err) {
                            console.log('updated:', updated)
                        }
                    })
                }
            })
        }
    }

    populate().then(() => {
        console.log('populated');
        res.send('populated')
    })
})

// currently, registration and login go through this same route (registration is done in the passport local strategy, see my passport.js file)
/* note, however, that this just sends a 401 response without further customization if the authentication fails. using a callback (like option 1) gives us more options */
dbRouter.post('/user/', passport.authenticate('local'), (req, res) => {
    console.log(`Authenticated user ${req.user.username}`);
    res.json({username: req.user.username})
})

dbRouter.post('/u/register', (req, res) => {
    const { username, password } = req.body.newUser;

    User.findOne({username}, async (err, foundUser) => {
        console.log('inside user.findone');

        if (!err) {
            if (!foundUser) {
                let hashedPassword = await hash(password, 10);
                let newUser = new User({username, password: hashedPassword})
                newUser.save((err, savedUser) => {
                    if (!err) {
                        console.log('saved new user');
                        res.status(201).send('New user created')
                    } else {
                        res.status(400).send(err)
                    }
                })
            } else {
                res.status(409).send('user exists already')
            }
        } else {
            res.status(400).send(err)
        }
    })
})
/**
 * Subrouter for owner-protected routes (e.g. /u/admin/lists) 
 * @note Creation and authentication of users happens outside this subrouter.
 */
const userRouter = express.Router({mergeParams: true});
  userRouter.use(isLoggedIn);
  userRouter.use(userOwnsRoute);
dbRouter.use('/u/:username', userRouter);

userRouter.get('/user', (req, res) => {
    let populate = req.query.populate
    let username = req.params.username;

    if (populate) {
        User.findOne({ username: username }).populate(populate).exec((err, foundUser) => {
            res.json(foundUser)
        })
    } else {
        User.findOne({ username: username }, (err, foundUser) => {
            res.json(foundUser);
        })
    }
})

userRouter.get('/list', (req, res) => {
    const { filter, ...query } = req.query;  // expect query like '?filter=-content&username=foo'
    List.findOne({ ...query }, filter, (err, found) => { res.json(found) })
})
userRouter.post('/list', (req, res) => {
    const { owner, name, from, to, content } = req.body.newList;

    if(req.user.username === owner) {
        List.findOne({ owner, name }, (err, foundList) => {
            if (err) { throw err }
            if (foundList) {
                console.log('found list ')
                res.json(foundList)
            }
            if (!foundList) {
                const newList = new List({
                    owner: owner,
                    name: name,
                    from: from,
                    to: to,
                    content: content
                });
                newList.save((err, savedList) => {
                    if (err) { console.log(err.errors[Object.keys(err.errors)[0]]['properties'].message) };
                    if (savedList) {
                        console.log('new list saved to db:', savedList);
                        User.findOneAndUpdate({ username: owner }, { $push: { lists: savedList } }, { new: true }, (err, updatedUser) => {
                            console.log(`added list ${savedList.name} to user ${savedList.owner}`);
                            res.json(savedList)
                        }
                        )
                    }
                })
            }
        })
    }
})
userRouter.put('/list', (req, res) => {
    const { query, body } = req.body.data;
    // console.log(body);

    List.findOneAndUpdate(query, {
        $set: {
            ...body            
        }
    },
        { new: true }, (err, updated) => {
            if (err) { res.status(500).send('Error updating list in database') }
            else { res.status(200).send(updated) }
        })
})

userRouter.delete('/list', (req, res) => {
    List.findOneAndDelete({ ...req.query }, (err, deletedList) => {
        if (!err) {
            res.status(200).json(deletedList)
        } else if (err) {
            res.status(404).send('Could not delete requested list.')
        }
    })
})

userRouter.get('/lists', (req, res) => {
    List.find({ owner: req.params.username }, '-content', (err, found) => {
        res.json(found);
    })
})

