const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    owner: String,  // username,
    name: String,
    from: String,  // original language
    to: [{type: String}],  // other languages (not just a string since want to be able to do multiple translations/definitions at a time)
    content: [
        {
            front: String,  // srs system: cards have a 'front' and 'back' side
            back: String,
        }
    ]   
}, { collation: {locale: 'en', strength: 2}}) 

module.exports = { listSchema };