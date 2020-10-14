const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    owner: String,
    sets: Array
}, { collation: {locale: 'en', strength: 2}})

module.exports = { setSchema }