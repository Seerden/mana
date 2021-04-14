import mongoose from 'mongoose';
export const reviewSessionSchema = new mongoose.Schema({
    owner: String,
    listIds: Array,
    date: { type: mongoose.Schema.Types.Mixed },
    terms: [{
            listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
            termIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Term' }]
        }],
    settings: {
        type: mongoose.Schema.Types.Mixed
    },
    timePerCard: [{ type: Number }],
    passfail: [{ type: String }] // 'pass'/'fail'
});
export const ReviewSession = mongoose.model('ReviewSession', reviewSessionSchema);
//# sourceMappingURL=reviewSessionSchema.js.map