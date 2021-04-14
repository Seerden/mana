import mongoose, { Document, ObjectId } from 'mongoose';
import { TermElementInterface } from './termSchema';
import { reviewSessionSchema } from './reviewSessionSchema.js';

export interface ListInterface extends Document {
    owner: string,
    name: string,
    from: string,
    to: string[],
    terms: ObjectId[],
    sessions: ObjectId[],
    created: Date,
    lastReviewed: Date,
    setMembership: ObjectId[],
    state: {forwards: string, backwards: string}
}

export const listSchema = new mongoose.Schema({
    owner: {
        type: String,
        default: 'seerden'
    },
    name: { type: String, required: true },
    from: { type: String, required: true },  // original language
    to: [  // note: array, to allow for multiple target languages 
        { type: String, required: true }
    ],  
    terms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Term',
        }
    ],
    sessions: [reviewSessionSchema],
    created: Date,
    lastReviewed: Date,  // refers to last ?kind=full review
    setMembership: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
    state: {
        type: mongoose.Schema.Types.Mixed, 
        default: {forwards: 'untouched', backwards: 'untouched'}  // untouched -> seeding -> seeded at 0, 1 and 3 reviews for that direction
    },
}, { collation: { locale: 'en', strength: 2 } }) 

export const List = mongoose.model<ListInterface>('List', listSchema);