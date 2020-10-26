import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    username: String,
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
    currentSession: {type: mongoose.Schema.Types.ObjectId}
}, { collation: { locale: 'en', strength: 2 } })