import mongoose, { Document, ObjectId } from 'mongoose';
import { List } from './listSchema';

export interface TermInterface extends Document {
    owner: string,
    languages: {from: string, to: string},
    to: string,
    from: string,
    history: {date:Date, content: any[], direction: string}[],
    saturation: {forwards: string | null, backwards: string | null},
    listMembership: any[]

}

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
})

export const Term = mongoose.model<TermInterface>('Term', termSchema);