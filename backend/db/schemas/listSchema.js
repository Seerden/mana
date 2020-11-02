import mongoose from 'mongoose';

const termSchema = new mongoose.Schema({
    to: String,
    from: String,
    history: { type: Array, default: [] },
    saturation: Number,
})

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
    to: [{ type: String, required: true }],  // other languages (not just a string since want to be able to do multiple translations/definitions at a time)
    content: [
        { type: termSchema, required: true }
    ],
    sessions: [{ type: sessionSchema }],
    numTerms: { type: Number, default: function () { return this.content.length } },
    created: Date,
    lastReviewed: Date,
}, { collation: { locale: 'en', strength: 2 } }) 