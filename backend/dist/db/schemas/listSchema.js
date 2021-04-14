import mongoose from 'mongoose';
import { reviewSessionSchema } from './reviewSessionSchema.js';
export const listSchema = new mongoose.Schema({
    owner: {
        type: String,
        default: 'seerden'
    },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: [
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
    lastReviewed: Date,
    setMembership: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
    state: {
        type: mongoose.Schema.Types.Mixed,
        default: { forwards: 'untouched', backwards: 'untouched' } // untouched -> seeding -> seeded at 0, 1 and 3 reviews for that direction
    },
}, { collation: { locale: 'en', strength: 2 } });
export const List = mongoose.model('List', listSchema);
//# sourceMappingURL=listSchema.js.map