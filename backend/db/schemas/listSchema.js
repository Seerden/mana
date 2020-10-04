const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
    to: String,
    from: String
})

const listSchema = new mongoose.Schema({
    owner: {
        type: String,
        default: 'seerden'
    },  // username,
    name: String,
    from: String,  // original language
    to: [{type: String}],  // other languages (not just a string since want to be able to do multiple translations/definitions at a time)
    content: [
        [termSchema]
    ]   
}, { collation: {locale: 'en', strength: 2}}) 

module.exports = { listSchema };