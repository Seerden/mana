import mongoose, { Document, ObjectId } from 'mongoose';

export interface ReviewSessionInterface extends Document {
    owner: string,
    listIds: ObjectId[],
    date: {start: Date, end: Date},
    terms: {listId: ObjectId, termIds: ObjectId}[],
    settings: any,
    timePerCard: number[],
    passfail: string[]
}

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

export const ReviewSession = mongoose.model<ReviewSessionInterface>('ReviewSession', reviewSessionSchema);