import { dbConn } from '../db/db.js'
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import 'dotenv/config.js';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from '../auth/passport.js';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);

import bcrypt from 'bcryptjs';
const { hash } = bcrypt;

const User = dbConn.model('User');
const List = dbConn.model('List');
const Set = dbConn.model('Set');
const Term = dbConn.model('Term');

/**
 * Express router for /db routes, used as API endpoints for frontend interaction with the database.
 */
export const dbRouter = express.Router();
dbRouter.use(bodyParser.urlencoded({ limit: '5mb', parameterLimit: 10000, extended: true }));
dbRouter.use(bodyParser.json());
dbRouter.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: dbConn
    }),
    cookie: {
        maxAge: 1000 * 3600 * 24,  // TTL in milliseconds
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
    res.json({ username: req.user.username })
})

dbRouter.post('/u/register', (req, res) => {
    const { username, password } = req.body.newUser;

    User.findOne({ username }, async (err, foundUser) => {
        console.log('inside user.findone');

        if (!err) {
            if (!foundUser) {
                let hashedPassword = await hash(password, 10);
                let newUser = new User({ username, password: hashedPassword })
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
const userRouter = express.Router({ mergeParams: true });
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

// ----- routes related to a single list -----
userRouter.get('/list', (req, res) => {
    const { filter, ...query } = req.query;  // expect query like '?filter=-content&username=foo'
    List
        .findOne({ ...query })
        .populate('terms')
        .exec((err, doc) => {
            doc && res.json(doc)
        })
})
userRouter.post('/list', async (req, res) => {
    const newList = new List(req.body.newList)
    const newTerms = await Term.create(req.body.newList.terms);
    newList.terms = newTerms.map(term => mongoose.Types.ObjectId(term._id))
    newList.save((err, doc) => res.status(200).json(doc));
})

userRouter.put('/list', (req, res) => {
    const { query, body } = req.body.data;

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

// ----- routes related to terms -----
userRouter.delete('/term', (req, res) => {
    Term.findOne({ _id: req.query.termId }, (err, deletedDoc) => {
        if (err) res.status(400).send('Error deleting term.')
        if (deletedDoc) res.status(200).send('Term deleted successfully.')
    })
})

userRouter.put('/term', (req, res) => {
    const { query, body } = req.body.data;
    Term.findOneAndUpdate({ ...query }, { $set: { ...body } }, { new: true }, (err, doc) => {
        if (err) res.status(400).send('Error updating term.');
        res.status(200).json(doc)
    })
})

userRouter.put('/terms', (req, res) => {
    const { body, query } = req.body.data;
    const { termsToUpdate } = body;

    switch (query.type) {
        case 'history':
            const bulkUpdateOperations = [];
            for (let term of termsToUpdate) {
                bulkUpdateOperations.push({
                    updateOne: {
                        filter: { _id: term.termId },
                        update: { $push: { history: term.newHistoryEntry } }
                    }
                })
            }

            Term.bulkWrite(bulkUpdateOperations, (err, bulkResponse) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('Error bulk updating term histories.')
                }
                else {
                    console.log('Bulk wrote term histories.');
                    res.status(200).send('Term histories updated.')
                };
            })
            break;

        case 'saturation':
            const bulkSaturationUpdate = [];
            for (let term of termsToUpdate) {
                bulkSaturationUpdate.push({
                    updateOne: {
                        filter: { _id: term.termId },
                        update: { $set: { saturation: term.saturation } }
                    }
                })
            }

            Term.bulkWrite(bulkSaturationUpdate, (err, bulkResponse) => {
                if (err) {
                    console.log(err);
                    res.status(400).send('Error bulk updating term saturation.')
                }
                else {
                    console.log('Bulk wrote term saturation.');
                    res.status(200).send('Term saturations updated.')
                }
            })
            break;
    }

})

// ----- routes related to multiple lists -----
userRouter.get('/lists', (req, res) => {
    List.find({ owner: req.params.username }, '-content', (err, found) => {
        res.json(found);
    })
})

// ----- routes related to sets -----
userRouter.get('/set', (req, res) => {
    Set.findOne({
        owner: req.params.username,
        ...req.query
    }, (err, doc) => {
        if (doc) res.send(doc)
    })
});
userRouter.post('/set', (req, res) => {
    const { owner, name } = req.body.newSet;
    Set.findOne({ owner, name }, (err, doc) => {
        if (!err && !doc) {
            let newSet = new Set({ ...req.body.newSet });
            newSet.save((err, doc) => {
                if (!err && doc) res.send(doc)
            })
        } if (doc) {
            res.status(409).send('You already own a set with that name.')
        } if (err) {
            res.status(400).send('Error creating set.')
        }
    })
});
userRouter.put('/set', (req, res) => {
    const { query, body } = req.body.data;

    Set.findOneAndUpdate({ ...query }, { $set: body }, { new: true }, (err, doc) => {
        if (doc) res.status(204).send('Set updated successfully.');
        if (err) res.status(400).send('Error updating list.')
    })
});
userRouter.delete('/set', (req, res) => {
    Set.findOneAndDelete({ ...req.query }, (err, doc) => {
        if (err) res.status(400).send('Error deleting set.')
        if (doc) res.status(200).send('Set deleted successfully.')
    })
});

userRouter.get('/sets', (req, res) => {
    Set
        .find({ owner: req.query.owner })
        .populate({ path: 'lists', model: 'List', select: 'name' })
        .exec((err, doc) => {
            const setsArray = doc.length > 0 ? doc : [doc]
            res.send(setsArray)
        })

})

// List
//     .find({owner: 'seerden'})
//     .where('numTerms').gt(100)
//     .exec((err, docs) => console.log(docs.map(doc => doc.name)))

// List.findOne({name: 'Kanji 1-30'}, (err, doc) => {
//     Term.findById(doc.terms[0]._id, (err, doc) => {
//         console.log(doc);
//     });
// })