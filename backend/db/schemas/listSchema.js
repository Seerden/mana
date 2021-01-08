import mongoose from 'mongoose';

const reviewSessionSchema = new mongoose.Schema({
    start: String,
    end: String,
    termsReviewed: Number,
    numTerms: Number,
    n: Number,
    direction: String,
})

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
    sessions: [  // will become obsolete once ReviewSession is fully implemented
        { type: reviewSessionSchema }
    ],
    numTerms: { 
        type: Number, 
        default: function () { return this.terms.length } 
    },
    created: Date,
    lastReviewed: Date,  // refers to last ?kind=full review
    setMembership: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
    state: {
        type: mongoose.Schema.Types.Mixed, 
        default: {forwards: 'untouched', backwards: 'untouched'}  // untouched -> seeding -> seeded at 0, 1 and 3 reviews for that direction
    },
}, { collation: { locale: 'en', strength: 2 } }) 