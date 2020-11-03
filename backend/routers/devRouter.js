// import db connection and models
import { dbConn } from '../db/db.js';

const User = dbConn.model('User');
const List = dbConn.model('List');
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import 'dotenv/config.js';

export const devRouter = express.Router();
devRouter.use(bodyParser.urlencoded({extended: true}));
devRouter.use(bodyParser.json());

// @dev: downloading a file on frontend that's stored on backend, see also frontend/component/Download
import path from 'path';
devRouter.get('/download', (req, res) => {
    res.download(path.resolve(__dirname, '../dev/wrts/excel-list-kanji-1-30..json'));
})

devRouter.get('/list', (req, res) => {
    const [owner, listName] = [req.query.owner, req.query.listName];
    List.find( { owner }).populate('lists').exec((err, found) => {res.json(found)})
    
    List.find({ owner }, (err, foundList) => {
        if(!err){
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
    User.find({username}, (err, found) => res.send(found))
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
    User.findOneAndUpdate({username: process.env.MANA_ADMIN_USER}, {$set: {password: hashedPassword}}, {new: true}, (err, updated) => {
        if(!err) {
            console.log('update user', updated)
            res.send('updated user')
        }
    })
})

devRouter.get('/onelistbyuser', (req, res) => {
    const username = req.query.username;
    console.log(username);
    List.findOne({owner: username, name: "Test"}, (err, foundList) => {
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