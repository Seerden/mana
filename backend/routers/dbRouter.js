const { dbConn } = require('../db/db.js');
const User = dbConn.model('User');
const List = dbConn.model('List');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

/**
 * Express router for /db routes, used as API endpoints for frontend interaction with the database.
 */
const dbRouter = express.Router();
dbRouter.use(bodyParser.urlencoded({ extended: true }));
dbRouter.use(bodyParser.json());

dbRouter.get('/list/devpopulate', (req, res) => {
    const base = path.join(__dirname, '../dev/kklc');
    const filenames = fs.readdirSync(base)
    const jsonFiles = filenames.filter(f => f.includes('json'))

    const populate = async () => {
        for (let file of jsonFiles) {
            let data = fs.readFileSync((path.join(base, file)), 'UTF-8');
            let { name, content } = JSON.parse(data);
            content = content.filter(i => (i.from !== null && i.to !== null))
            // console.log(content);
            const newList = new List({
                owner: 'seerden',
                name,
                from: 'Japanese',
                to: "English",
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

dbRouter.post('/u/', (req, res) => {
    const username = req.body.username;

    // check if username exists in DB. if not, create the user
    User.findOne({ username: username }, (err, foundUser) => {
        if (err) throw err;
        if (!foundUser) {
            const newUser = new User({ username: username });
            newUser.save((err, savedUser) => {
                console.log('new user created in db: ', savedUser);
                res.json(savedUser)
            })
        }
    })
})

dbRouter.get('/listsbyuser/:username', (req, res) => {
    const username = req.params.username;
    List.find({ owner: username }, '-content', (err, found) => {
        res.json(found);
    })
})

dbRouter.get('/list', (req, res) => {
    const { filter, ...query } = req.query;  // expect query like '?filter=-content&username=foo'
    List.findOne({ ...query }, filter, (err, found) => { res.json(found) })
})

dbRouter.post('/list', (req, res) => {
    const { owner, name, from, to, content } = req.body.newList;

    // check if this user has a list by this name, else put list in db and add the list to the user's lists in the db
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

module.exports = { dbRouter }