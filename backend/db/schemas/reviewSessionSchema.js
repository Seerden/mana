import mongoose from 'mongoose';

export const reviewSessionSchema = new mongoose.Schema({
    owner: String,
    date: { type: mongoose.Schema.Types.Mixed },  // { start, end }
    terms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Term' }],
    settings: {
        type: mongoose.Schema.Types.Mixed
    },
    timePerCard: [{ type: Number }],  // [ms]
    passfail: [{ type: String }]  // 'pass'/'fail'
})