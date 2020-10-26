// import db connection and models
const { dbConn } = require('../db/db.js');
const Auth = dbConn.model('Auth');

const express = require('express');
const bodyParser = require('body-parser');

const authRouter = express.Router();
authRouter.use(bodyParser.urlencoded({extended: true}));
authRouter.use(bodyParser.json());

authRouter.post('/user/verify', (req, res) => {
    const { username, email } = req.body;

    const newUserAuth = new Auth({username, email});
    newUserAuth.save((err, saved) => {
        if (!err) {
            res.send('userAuth instance posted to db')
        }
    })
})

authRouter.get('/user/verify', (req, res) => {
    const { username, email, token } = req.query;

    Auth.findOne({username, email}, (err, found) => {
        if (!err) {
            found 
                ? res.send('found auth instance') 
                : res.send("didn't find auth instance")
        }
    })

})

module.exports = { authRouter }