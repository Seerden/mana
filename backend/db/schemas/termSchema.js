import mongoose from 'mongoose';

export const termSchema = new mongoose.Schema({
    owner: String,
    languages: { from: String, to: String },
    to: String,
    from: String,
    history: [{ date: Date, content: Array, direction: String }],
    saturation: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            forwards: null,
            backwards: null
        }
    },
    listMembership: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    lastReviewed: { type: mongoose.Schema.Types.Mixed, default: getLastReviewedDateFromHistory }
}
)

function getLastReviewedDateFromHistory() {
    let history = this.history;

    let filterByDirection = (direction) => history.filter(entry => entry.direction === direction);

    let forwards = filterByDirection('forwards');
    let backwards = filterByDirection('backwards');

    return ({
        forwards: forwards?.reverse()[0]?.date || null,
        backwards: backwards?.reverse()[0]?.date || null
    })
}