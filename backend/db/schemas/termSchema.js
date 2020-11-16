import mongoose from 'mongoose';

export const termSchema = new mongoose.Schema({
    owner: String,
    languages: {from: String, to: String},
    to: String,
    from: String,
    history: [{date: Date, content: Array, direction: String}],
    saturation: {type: mongoose.Schema.Types.Mixed, default: {
        forwards: null, 
        backwards: null
    }},
    listMembership: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}]
})