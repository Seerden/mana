// import db connection and models
import { dbConn } from '../db/db.js';

const User = dbConn.model('User');
const List = dbConn.model('List');
import express from 'express';
import bodyParser from 'body-parser';

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

devRouter.get('/user', (req, res) => {
    let newUser = new User({username: 'seerden'})
    newUser.save((err, saved) => {
        if(!err) {
            console.log(saved);
            res.send('saved new user')
        }
    })
})
