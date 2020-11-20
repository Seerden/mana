import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
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
    to: [
        { type: String, required: true }
    ],  // other languages (not just a string since want to be able to do multiple translations/definitions at a time)
    terms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Term',
        }
    ],
    sessions: [
        { type: sessionSchema }
    ],
    numTerms: { type: Number, default: function () { return this.terms.length } },
    created: Date,
    lastReviewed: Date,
    setMembership: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Set' }],
    state: { forwards: { type: String, default: 'untouched' }, backwards: { type: String, default: 'untouched' } }
}, { collation: { locale: 'en', strength: 2 } }) 