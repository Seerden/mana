import mongoose from 'mongoose';

export const reviewSessionSchema = new mongoose.Schema({
    owner: String,
    listIds: Array,
    date: { type: mongoose.Schema.Types.Mixed },  // { start, end }
    terms: [{
        listId: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
        termIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Term'}]
    }],
    settings: {
        type: mongoose.Schema.Types.Mixed
    },
    timePerCard: [{ type: Number }],  // [ms]
    passfail: [{ type: String }]  // 'pass'/'fail'
})