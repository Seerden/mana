import mongoose from 'mongoose';

export const reviewSessionSchema = new mongoose.Schema({
    owner: String,
    parentLists: {
        type: Array,
        default: []
    },
    start: Date,
    end: Date,
    terms: [
        {
            listId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'List'
            },
            termIds: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Term'
            }]
        },
    ],
    settings: {
        type: mongoose.Schema.Types.Mixed
    },
    timePerCard: [{type: Number || Date}],
    passfail: [{type: String}]
})