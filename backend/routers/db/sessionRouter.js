import { dbConn } from '../../db/db.js';
import mongoose from 'mongoose';
import express from 'express';

const ReviewSession = dbConn.model('ReviewSession');
const List = dbConn.model('List');

export const sessionRouter = express.Router({mergeParams: true});

sessionRouter.get('/', (req, res) => {  // GET all sessions for a given user
    ReviewSession.find({owner: req.params.username}, (err, docs) => {
        res.send(docs)
    })
})

sessionRouter.get('/list', (req, res) => {  // GET all sessions involving any terms from a given list
    Session.find({lists: {$in: req.query.listId}})
})

sessionRouter.post('/', (req, res) => {  // POST a session to the database
    let newReviewSession = new ReviewSession(req.body.newReviewSession);
    newReviewSession.save((err, savedDoc) => {
        if (err) res.status(500).send('Failed to send session to database.');
        if (savedDoc) res.status(201).send('Successfully posted review session to database')
    })
})

export default sessionRouter;

// mock interactions
function createMockSession(username) {
    List.findOne({owner: username}, (err, doc) => {
        if (!err) {
            let mockSession = new ReviewSession({
                owner: username,
                parentLists: [doc._id],
                start: new Date('January 5, 2021 12:45:93'),
                end: Date.now('January 5, 20201 13:23:12'),
                terms: [
                    {
                        listId: doc._id,
                        termIds: doc.terms
                    }
                ],
                settings: {
                    direction: 'forwards',
                    cycles: 2
                },
                timePerCard: [400, 350, 420, 348],
                passfail: ['pass', 'pass', 'pass', 'pass']
            })

            mockSession.save((saveErr, savedDoc) => {
                if (!saveErr) {
                    console.log(savedDoc);
                }
            })
        }
    })
}

function logAllSessionDocuments() {
    ReviewSession.find({}, (err, docs) => {
        console.log(docs);
    })
}

function deleteAllSessionDocuments() {
    ReviewSession.deleteMany({}, (err, deleted) => {
        if (deleted) {
            console.log(deleted.deletedCount);
        }
    })
}