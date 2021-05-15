import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bcrypt from 'bcryptjs';

import { TermElementInterface} from '../db/schemas/termSchema';
import { dbConn } from '../db/db'

const MongoStore = connectMongo(session);
const { hash } = bcrypt;

// const User = dbConn.model('User');
import { UserModel as User } from '../graphql/types/User'
const Set = dbConn.model('Set');

import { sessionRouter } from './db/sessionRouter';

/**
 * Express router for /db routes, used as API endpoints for frontend interaction with the database.
 */
export const dbRouter = express.Router();
dbRouter.use(express.urlencoded({ limit: '5mb', parameterLimit: 10000, extended: true }));
dbRouter.use(express.json());
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

// currently, registration and login go through this same route (registration is done in the passport local strategy, see my passport.js file)
/* note, however, that this just sends a 401 response without further customization if the authentication fails. using a callback (like option 1) gives us more options */
<<<<<<< HEAD
// dbRouter.post('/user/', passport.authenticate('local'), (req, res) => {
//     console.log(`Authenticated user ${req.user}`);
//     res.json({ username: req.user })
// })

// dbRouter.post('/u/register', (req, res) => {
//     const { username, password } = req.body.newUser;

//     User.findOne({ username }, async (err, foundUser) => {
//         console.log('inside user.findone');

//         if (!err) {
//             if (!foundUser) {
//                 let hashedPassword = await hash(password, 10);
//                 let newUser = new User({ username, password: hashedPassword })
//                 newUser.save((err, savedUser) => {
//                     if (!err) {
//                         console.log('saved new user');
//                         res.status(201).send('New user created')
//                     } else {
//                         res.status(400).send(err)
//                     }
//                 })
//             } else {
//                 res.status(409).send('user exists already')
//             }
//         } else {
//             res.status(400).send(err)
//         }
//     })
// })

// /**
//  * Subrouter for owner-protected routes (e.g. /u/admin/lists) 
//  * @note Creation and authentication of users happens outside this subrouter.
//  */
// const userRouter = express.Router({ mergeParams: true });
// userRouter.use(isLoggedIn);
// userRouter.use(userOwnsRoute);
// dbRouter.use('/u/:username', userRouter);

// userRouter.get('/user', (req, res) => {
//     let populate = req.query.populate
//     let username = req.params.username;

//     if (populate) {
//         User.findOne({ username: username }).populate(populate).exec((err, foundUser) => {
//             res.json(foundUser)
//         })
//     } else {
//         User.findOne({ username: username }, (err, foundUser) => {
//             res.json(foundUser);
//         })
//     }
// })

// // ----- routes related to a single list -----
// userRouter.get('/list', (req, res) => {
//     const { filter, ...query } = req.query;  // expect query like '?filter=-content&username=foo'
//     List
//         .findOne({ ...query })
//         .populate('terms sessions')
//         .lean()
//         .exec((err, doc) => {
//             if (doc) {
//                 res.json(doc)
//             }
//         })
// })

// userRouter.post('/list', async (req, res) => {
//     const newList = new List(req.body.newList)
//     let terms: [] = req.body.newList.terms.map(term => ({ ...term, owner: req.body.newList.owner }))
//     const newTerms: TermElementInterface[] = await Term.create(terms);
//     newList.terms = newTerms.map(term => new mongoose.Schema.Types.ObjectId(term._id))
//     newList.save((err, doc) => res.status(200).json(doc));
// })

// userRouter.put('/list', (req, res) => {
//     const { query, body } = req.body.data;

//     List.findOneAndUpdate(query, {
//         $set: {
//             ...body
//         }
//     },
//         { new: true }, (err, updated) => {
//             if (err) { res.status(500).send('Error updating list in database') }
//             else { res.status(200).send(updated) }
//         })
// })

// userRouter.delete('/list', (req, res) => {
//     List.findOneAndDelete({ ...req.query }, null, (err, deletedList) => {
//         if (!err) {
//             // remove all terms
//             Term.deleteMany({ _id: [...deletedList.terms] }, null, (err) => {
//                 if (!err) {
//                     res.status(200).send('List and its terms successfully deleted.')
//                 }
//             })
//         } else if (err) {
//             res.status(404).send('Could not delete requested list.')
//         }
//     })
// })

// // ----- routes related to terms -----
// userRouter.delete('/term', (req, res) => {
//     Term.findOne({ _id: req.query.termId }, (err, deletedDoc) => {
//         if (err) res.status(400).send('Error deleting term.')
//         if (deletedDoc) res.status(200).send('Term deleted successfully.')
//     })
// })

// userRouter.put('/term', (req, res) => {
//     const { query, body } = req.body.data;
//     Term.findOneAndUpdate({ ...query }, { $set: { ...body } }, { new: true }, (err, doc) => {
//         if (err) res.status(400).send('Error updating term.');
//         res.status(200).json(doc)
//     })
// })

// userRouter.put('/terms', (req, res) => {
//     const { body, query } = req.body.data;
//     const { termsToUpdate } = body;

//     switch (query.type) {
//         case 'history':
//             const bulkUpdateOperations = [];
//             for (let term of termsToUpdate) {
//                 bulkUpdateOperations.push({
//                     updateOne: {
//                         filter: { _id: term.termId },
//                         update: { $push: { history: term.newHistoryEntry } }
//                     }
//                 })
//             }

//             Term.bulkWrite(bulkUpdateOperations, null, (err, bulkResponse) => {
//                 if (err) {
//                     console.log(err);
//                     res.status(400).send('Error bulk updating term histories.')
//                 }
//                 else {
//                     console.log('Bulk wrote term histories.');
//                     res.status(200).send('Term histories updated.')
//                 };
//             })
//             break;

//         case 'saturation':
//             const bulkSaturationUpdate = [];
//             for (let term of termsToUpdate) {
//                 bulkSaturationUpdate.push({
//                     updateOne: {
//                         filter: { _id: term.termId },
//                         update: { $set: { saturation: term.saturation } }
//                     }
//                 })
//             }

//             Term.bulkWrite(bulkSaturationUpdate, null, (err, bulkResponse) => {
//                 if (err) {
//                     console.log(err);
//                     res.status(400).send('Error bulk updating term saturation.')
//                 }
//                 else {
//                     console.log('Bulk wrote term saturation.');
//                     res.status(200).send('Term saturations updated.')
//                 }
//             })
//             break;
//     }

// })

// // ----- routes related to multiple lists -----
// userRouter.get('/lists', (req, res) => {
//     const { username } = req.params;

//     List
//         .find({ owner: username })
//         .populate('sessions')
//         .lean()
//         .exec((err, docs) => {
//             if (err) {
//                 console.log(err);
//                 res.status(403).send('Error fetching lists')
//             } else {
//                 res.json(docs)
//             }
//         })
// })

// // ----- routes related to sets -----
// userRouter.get('/set', (req, res) => {
//     Set.findOne({
//         owner: req.params.username,
//         ...req.query
//     }, (err, doc) => {
//         if (doc) res.send(doc)
//     })
// });

// userRouter.post('/set', (req, res) => {
//     const { owner, name } = req.body.newSet;
//     Set.findOne({ owner, name }, (err, doc) => {
//         if (!err && !doc) {
//             let newSet = new Set({ ...req.body.newSet });
//             newSet.save((err, doc) => {
//                 if (!err && doc) res.send(doc)
//             })
//         } if (doc) {
//             res.status(409).send('You already own a set with that name.')
//         } if (err) {
//             res.status(400).send('Error creating set.')
//         }
//     })
// });

// userRouter.put('/set', (req, res) => {
//     const { query, body } = req.body.data;

//     Set.findOneAndUpdate({ ...query }, { $set: body }, { new: true }, (err, doc) => {
//         if (doc) res.status(204).send('Set updated successfully.');
//         if (err) res.status(400).send('Error updating list.')
//     })
// });

// userRouter.delete('/set', (req, res) => {
//     Set.findOneAndDelete({ ...req.query }, null, (err, doc) => {
//         if (err) res.status(400).send('Error deleting set.')
//         if (doc) res.status(200).send('Set deleted successfully.')
//     })
// });

// userRouter.get('/sets', (req, res) => {
//     Set
//         .find({ owner: req.query.owner })
//         .populate({ path: 'lists', model: 'List', select: 'name' })
//         .exec((err, doc) => {
//             const setsArray = doc.length > 0 ? doc : [doc]
//             res.send(setsArray)
//         })

// })

// userRouter.use('/session', sessionRouter)
=======
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
        .populate('terms sessions')
        .exec((err, doc) => {
            doc && res.json(doc)
        })
})

userRouter.post('/list', async (req, res) => {
    const newList = new List(req.body.newList)
    let terms: [] = req.body.newList.terms.map(term => ({ ...term, owner: req.body.newList.owner }))
    const newTerms: TermElementInterface[] = await Term.create(terms);
    newList.terms = newTerms.map(term => new mongoose.Schema.Types.ObjectId(term._id))
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
    List.findOneAndDelete({ ...req.query }, null, (err, deletedList) => {
        if (!err) {
            // remove all terms
            Term.deleteMany({ _id: [...deletedList.terms] }, null, (err) => {
                if (!err) {
                    res.status(200).send('List and its terms successfully deleted.')
                }
            })
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

            Term.bulkWrite(bulkUpdateOperations, null, (err, bulkResponse) => {
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

            Term.bulkWrite(bulkSaturationUpdate, null, (err, bulkResponse) => {
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
    const { username } = req.params;

    List
        .find({ owner: username })
        .populate('sessions')
        .exec((err, docs) => {
            if (err) {
                console.log(err);
                res.status(403).send('Error fetching lists')
            } else {
                res.json(docs)
            }
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
    Set.findOneAndDelete({ ...req.query }, null, (err, doc) => {
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

userRouter.use('/session', sessionRouter)
>>>>>>> 7226575e18d149e9ce9d85c7fe72ea2d0ee6ca99
