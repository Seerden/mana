import mongoose from 'mongoose';
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true)
import { userSchema } from './schemas/userSchema';
import { setSchema } from './schemas/setSchema';
import { listSchema, ListInterface } from './schemas/listSchema';
import { reviewSessionSchema, ReviewSessionInterface } from './schemas/reviewSessionSchema';
import { termSchema, TermElementInterface } from './schemas/termSchema';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mana-cluster0.8vpgs.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
export const dbConn = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    dbConn.on('connected', () => console.log('connected to db'));
    dbConn.on('error', error => console.log('error connecting to db'));

// export const MUser = dbConn.model('User', userSchema);
// export const MSet = dbConn.model('Set', setSchema);
// export const MTerm = dbConn.model<TermElementInterface>('Term', termSchema);
// export const MList = dbConn.model<ListInterface>('List', listSchema);
// export const MReviewSession = dbConn.model<ReviewSessionInterface>('ReviewSession', reviewSessionSchema)
