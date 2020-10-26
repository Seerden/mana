const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: String,
    email: String,
    createdAt: {type: Date, expires: '1m', default: Date.now}    
})

module.exports = { authSchema }