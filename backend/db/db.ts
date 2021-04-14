import mongoose from 'mongoose';
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true)
import { userSchema } from './schemas/userSchema.js';
import { setSchema } from './schemas/setSchema.js';

import { listSchema, ListInterface } from './schemas/listSchema.js';
import { reviewSessionSchema, ReviewSessionInterface } from './schemas/reviewSessionSchema.js';
import { termSchema, TermInterface } from './schemas/termSchema.js';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mana-cluster0.8vpgs.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
export const dbConn = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    dbConn.on('connected', () => console.log('connected to db'));
    dbConn.on('error', error => console.log('error connecting to db'));

export const User = dbConn.model('User', userSchema);
export const Set = dbConn.model('Set', setSchema);
export const Term = dbConn.model<TermInterface>('Term', termSchema);
export const List = dbConn.model<ListInterface>('List', listSchema);
export const ReviewSession = dbConn.model<ReviewSessionInterface>('ReviewSession', reviewSessionSchema)
