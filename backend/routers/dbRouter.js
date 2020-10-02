// import db connection and models
const { dbConn } = require('../db/db.js');
const User = dbConn.model('User');
const List = dbConn.model('List');

const express = require('express');
const bodyParser = require('body-parser');

const dbRouter = express.Router();
dbRouter.use(bodyParser.urlencoded({extended: true}));
dbRouter.use(bodyParser.json());

dbRouter.get('/u/:username', (req, res) => {
    let populate = req.query.populate
    console.log(populate)
    // populate = populate ? populate.replace(/[\[\]]/g, '').split(',') : null;
    let username = req.params.username;

    if (populate) {
        User.findOne({ username: username }).populate(populate).exec((err, foundUser) => {
            console.log('populated')
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

dbRouter.get('/list', (req, res) => {

})

dbRouter.post('/list', (req, res) => {
    const { listOwner, listName, listFrom, listTo, listContent } = req.body;
    console.log(req.body)

    // check if this user has a list by this name, else put list in db and add the list to the user's lists in the db
    List.findOne({ owner: listOwner, name: listName }, (err, foundList) => {
        if (err) { throw err }
        if (foundList) { res.json(foundList) }
        if (!foundList) {
            const newList = new List({
                owner: listOwner,
                name: listName,
                from: listFrom,
                to: listTo,
                content: listContent,
            });

            newList.save((err, savedList) => {
                if (err) { throw err };
                if (savedList) {
                    console.log('new list saved to db:', savedList);
                    User.findOneAndUpdate({ username: listOwner }, {$push: {lists: savedList}}, {new: true}, (err, updatedUser) => {
                        console.log(`added list ${savedList.name} to user ${savedList.owner}` );
                        res.json(savedList)
                    }
                    )
                }

            })
        }
    })


})

module.exports = { dbRouter }