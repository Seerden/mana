// import db connection and models
import { dbConn } from '../db/db';
import mongoose from 'mongoose';

const User = dbConn.model('User');
const List = dbConn.model('List');
const Set = dbConn.model('Set');
const Term = dbConn.model('Term');
const Test = dbConn.model('Test');

import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import 'dotenv/config.js';

export const devRouter = express.Router();
devRouter.use(bodyParser.urlencoded({ extended: true }));
devRouter.use(bodyParser.json());

// @dev: downloading a file on frontend that's stored on backend, see also frontend/component/Download
import path from 'path';
devRouter.get('/download', (req, res) => {
    res.download(path.resolve(__dirname, '../dev/wrts/excel-list-kanji-1-30..json'));
})

devRouter.get('/list', (req, res) => {
    const [owner, listName] = [req.query.owner, req.query.listName];
    List.find({ owner }).populate('lists').exec((err, found) => { res.json(found) })

    List.find({ owner }, (err, foundList) => {
        if (!err) {
            res.json(foundList.content)
        }
    })
})

devRouter.delete('/lists', (req, res) => {
    List.deleteMany({}, (err, result) => {
        res.send('removed')
    })
})

devRouter.get('/user/drop', (req, res) => {
    User.deleteMany({}, (err, result) => {
        res.send('removed')
    })
})

devRouter.get('/user/:username', (req, res) => {
    const { username } = req.params;
    User.find({ username }, (err, found) => res.send(found))
})

devRouter.get('/users', (req, res) => {
    User.find({}, 'username', (err, foundUsers) => {
        res.json(foundUsers)
    })
})

/**
 * password on admin account wasn't set yet, used this to set it retroactively
 */
devRouter.get('/updatepass', async (req, res) => {
    let hashedPassword = await bcrypt.hash(process.env.MANA_ADMIN_PASS, 10)
    User.findOneAndUpdate({ username: process.env.MANA_ADMIN_USER }, { $set: { password: hashedPassword } }, { new: true }, (err, updated) => {
        if (!err) {
            console.log('update user', updated)
            res.send('updated user')
        }
    })
})

devRouter.get('/onelistbyuser', (req, res) => {
    const username = req.query.username;
    console.log(username);
    List.findOne({ owner: username, name: "Test" }, (err, foundList) => {
        res.send(foundList)
    })
})


// @example: updating nested properties works like this. going for found.content = found.content.map(...) has proven troublesome. Maybe I just nested things wrong though
// List.findOne({owner: 'seerden', name: 'Kanji 1-30'}, (err, found) => {
//     for (let term of found.content) {
//         term.saturation = {forwards: null, backwards: null}
//         for (let i = 0; i < term.history.length; i++) {
//             term.history[i].direction = "forwards"
//         }
//     }

//     // console.log(found.content[0].history);
//     // found.save()
// })

// List.findOne({owner: 'a', name: 'Test'}, (err, found) => {
//     console.log(found.content[0].history);
// })

// ---- DEV: figure out a way to migrate all existing List.content entries into their own Term document (preserving _id)
function migrateTermsFromListContentToTermDocument() {
    List.find({}, (err, docs) => {
        for (let doc of docs) {
            if (doc.content?.length > 0) {
                for (let term of doc.content) {
                    // console.log(term);

                    let newTerm = new Term({
                        _id: term._id,
                        owner: doc.owner,
                        listMembership: [doc._id],
                        languages: {
                            from: doc.from,
                            to: doc.to[0]
                        },
                        to: term.to,
                        from: term.from,
                        saturation: {
                            forwards: term.saturation?.forwards || null,
                            backwards: term.saturation?.backwards || null
                        },
                        history: [...term.history]
                    }, { _id: false });

                    newTerm.save((err, savedDoc) => {
                        if (err) console.log(err);
                        else {
                            // console.log(savedDoc);
                            console.log('Term id matches list.content[idx] id:', savedDoc._id === term._id);
                        }

                    })
                }
            }
        }
    })
}

// ----- DELETE ALL EXISTING TERM DOCUMENTS
function deleteAllTermDocuments() {
    Term.deleteMany({}, (err, deleted) => {
        console.log(deleted);
    })

}

// ---- FIND ONE LIST BY a
function migrateOne(){
    List.findOne({ owner: 'a', name: 'sa' }, (err, doc) => {
        console.log(doc.content);
    
        for (let idx = 0; idx < doc.content.length; idx++) {
            let term = doc.content[idx];
            console.log(mongoose.Types.ObjectId(term._id));
            doc.content[idx] = mongoose.Types.ObjectId(term._id)
    
            doc.save((err, savedDoc) => {
                if (!err) console.log(savedDoc);
                console.log(err);
            })
        }
    })

}

function makeTerms(){
    List.find({}, (err, docs) => {
        for (let doc of docs) {
            if (doc.terms?.length > 0) {
                console.log('already has terms')
            } else {
                let terms = [];
        
                for (let term of doc.content) {
                    terms.push(mongoose.Types.ObjectId(term._id))
                }
        
                doc.terms = terms;
                doc.save((err, saved) => {
                    if (err) console.log(err);
                    // else console.log(saved);
                })
            }
        }
    })
}

function findOne(){
    List
        .findOne({owner: 'a', name: 'Test'})
        .populate('terms')
        .exec((err, doc) => {
            console.log(doc.terms[0]);
        })
}

async function removeAllContentEntries() {
    // NOTE: using $unset only works if the field still currently exists in the schema/model
    let res = await List.updateMany({_id: {$exists: true}}, {$unset: {content: 1}})
    console.log(res);
}

function makeTestDocumentInstance(){
    let newTestInstance = new Test({items: [1,2,3]});
    newTestInstance.save((err, savedDoc) => {
        console.log({savedDoc})
        Test.deleteMany({}, (err, deleted) => console.log('cleaned up Test collection, deletedCount:', deleted.deletedCount))
    });

}

function logOneListByAdmin(){
List
    .findOne({owner: process.env.MANA_ADMIN_USER})
    .populate('terms')
    .exec((err, doc) => {
        doc && console.log(doc.terms[0]);
    })

}

function runDevCodeOnServerStart() {
    return
}

runDevCodeOnServerStart();