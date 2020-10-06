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
    name: {type: String, required: true },
    from: { type: String, required: true },  // original language
    to: [{type: String, required: true}],  // other languages (not just a string since want to be able to do multiple translations/definitions at a time)
    content: [
        [{type: termSchema, required: true}]
    ]   
}, { collation: {locale: 'en', strength: 2}}) 

module.exports = { listSchema };