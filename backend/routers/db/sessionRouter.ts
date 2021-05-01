import express from 'express';

import { ReviewSession } from '../../db/db.js';
import { List } from '../../db/db.js';

export const sessionRouter = express.Router({ mergeParams: true });

sessionRouter.get('/', (req, res) => {  // GET all sessions for a given user
    ReviewSession.find({ owner: req.params.username }, (err, docs) => {
        res.send(docs)
    })
})

sessionRouter.get('/list', (req, res) => {  // GET all sessions involving any terms from a given list
    ReviewSession.find(() => ({ listIds: { $in: req.query.listId } }))
})

sessionRouter.post('/', async (req, res) => {
    // create a new ReviewSession document, save it, 
    // if only one list was reviewed, append the session the its parent List's .sessions array
    const { newReviewSession } = req.body;
    let newSession = new ReviewSession(newReviewSession);

    try {
        const savedSession = await newSession.save();

        if (savedSession.listIds.length === 1) {
            const listId = savedSession.listIds[0];
            console.log({ listId });

            try {
                await List.findOneAndUpdate({ _id: listId }, { $push: { sessions: savedSession._id } });
            } catch (e) {
                console.log('Error pushing newly saved ReviewSession instance to parent list');
            }
        }
        res.status(201).send('Successfully posted review session to database')
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to save new ReviewSession instance to database.')
    }
})

export default sessionRouter;

// mock interactions
function createMockSession(username) {
    List.findOne({ owner: username }, (err, doc) => {
        if (!err) {
            let mockSession = new ReviewSession({
                owner: username,
                parentLists: [doc._id],
                start: new Date('January 5, 2021 12:45:93'),
                end: Date.now(),
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