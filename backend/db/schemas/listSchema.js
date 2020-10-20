const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
    to: String,
    from: String,
    history: Array
})

const sessionSchema = new mongoose.Schema({
    start: String,
    end: String,
    numTerms: Number
})

const listSchema = new mongoose.Schema({
    owner: {
        type: String,
        default: 'seerden'
    },  
    name: {type: String, required: true },
    from: { type: String, required: true },  // original language
    to: [{type: String, required: true}],  // other languages (not just a string since want to be able to do multiple translations/definitions at a time)
    content: [
        {type: termSchema, required: true}
    ],
    sessions: [{type: sessionSchema}]
}, { collation: {locale: 'en', strength: 2}}) 


module.exports = { listSchema };