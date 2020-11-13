import mongoose from 'mongoose';

export const termSchema = new mongoose.Schema({
    owner: String,  // should match a User.name
    languages: {from: String, to: String},
    to: String,
    from: String,
    history: [{date: Date, content: Array, direction: String}],
    saturation: {
        forwards: Number, 
        backwards: Number
    },
    listMembership: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}]
})