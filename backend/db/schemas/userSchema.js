const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
    currentSession: {type: mongoose.Schema.Types.ObjectId}
}, { collation: { locale: 'en', strength: 2 } })

module.exports = { userSchema };