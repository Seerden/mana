import { dbConn } from '../db/db.js'
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import 'dotenv/config.js';
import session from 'express-session';
import passport from '../auth/passport.js';

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

dbRouter.get('/u/:username', (req, res) => {
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

dbRouter.get('/listsbyuser/:username', isLoggedIn, (req, res) => {
    console.log('getting lists by user');
    const username = req.params.username;
    List.find({ owner: username }, '-content', (err, found) => {
        res.json(found);
    })
})

dbRouter.get('/list',isLoggedIn, (req, res) => {
    const { filter, ...query } = req.query;  // expect query like '?filter=-content&username=foo'
    List.findOne({ ...query }, filter, (err, found) => { res.json(found) })
})

dbRouter.post('/list', isLoggedIn, (req, res) => {
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

dbRouter.delete('/list', (req, res) => {
    List.findOneAndDelete({ ...req.query }, (err, deletedList) => {
        if (!err) {
            res.status(200).json(deletedList)
        } else if (err) {
            res.status(404).send('Could not delete requested list.')
        }
    })
})

dbRouter.post('/list/update', async (req, res) => {
    const { query, body } = req.body.data;

    List.findOneAndUpdate(query, {
        $set: {
            content: body.content,
            sessions: body.sessions,
            lastReviewed: body.lastReviewed
        }
    },
        { new: true }, (err, updated) => {
            if (err) { res.status(500).send('Error updating list in database') }
            else { res.status(200).send(updated) }
        })
})


dbRouter.get('/testing', isLoggedIn, (req, res) => {
    res.send('hey bob')
})

// ---------- PASSPORT
// routes set up with authentication in mind

// currently, registration and login go through this same route (registration is done in the passport local strategy, see my passport.js file)

// ---- OPTION 1
    // dbRouter.post('/user/', (req, res, next) => passport.authenticate('local', (err, user, info) => {
    //     if (err) {
    //         // return res.status(400).json({errors: err})
    //         return res.status(400).send('error authenticating user !!!')
    //     }
    //     if (!user) {
    //         // return res.status(400).json({errors: 'user not found'})
    //         return res.status(400).send('error authing')
    //     }

    //     req.login(user, err => {
    //         // if (err) { return res.status(400).json({err})}
    //         if (err) { return res.status(400).json({err})}
    //         return res.status(200).json({username: user.username})
    //     })
    // })(req, res, next))

// ---- OPTION 2 (much, much cleaner)
/* note, however, that this just sends a 401 response without further customization if the authentication fails. using a callback (like option 1) gives us more options */
dbRouter.post('/user/', passport.authenticate('local'), (req, res) => {
    console.log(`Authenticated user ${req.user.username}`);
    res.json({username: req.user.username})
})