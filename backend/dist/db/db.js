import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
import { userSchema } from './schemas/userSchema.js';
import { setSchema } from './schemas/setSchema.js';
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mana-cluster0.8vpgs.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
export const dbConn = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
dbConn.on('connected', () => console.log('connected to db'));
dbConn.on('error', error => console.log('error connecting to db'));
const User = dbConn.model('User', userSchema);
const Set = dbConn.model('Set', setSchema);
//# sourceMappingURL=db.js.map