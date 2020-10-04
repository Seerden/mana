// import db connection and models
const { dbConn } = require('../db/db.js');
const User = dbConn.model('User');
const List = dbConn.model('List');

const express = require('express');
const bodyParser = require('body-parser');

const testRouter = express.Router();
testRouter.use(bodyParser.urlencoded({extended: true}));
testRouter.use(bodyParser.json());

testRouter.get('/list', (req, res) => {
    const [owner, listName] = [req.query.owner, req.query.listName];
    List.find( { owner }).populate('lists').exec((err, found) => {res.json(found)})
    
    List.find({ owner }, (err, foundList) => {
        if(!err){
            res.json(foundList.content)
        }
    })
})

testRouter.get('/list/drop', (req, res) => {
    List.deleteMany({}, (err, result) => {
        res.json
    })
})

module.exports = { testRouter }