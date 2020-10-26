const mongoose = require('mongoose');
  mongoose.set('useFindAndModify', false);
const { userSchema } = require('./schemas/userSchema');
const { listSchema } = require('./schemas/listSchema');
const { authSchema } = require('./schemas/authSchema');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mana-cluster0.8vpgs.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbConn = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    dbConn.on('connected', () => console.log('connected to db'));
    dbConn.on('error', error => console.log('error connecting to db'));

const User = dbConn.model('User', userSchema);
const List = dbConn.model('List', listSchema);
const Auth = dbConn.model('Auth', authSchema);

module.exports = { dbConn }