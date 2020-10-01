const express = require('express')
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mana-cluster0.8vpgs.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const conn = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});
conn.on('connected', () => console.log('connected to db'));
conn.on('error', error => console.log('error connecting to db'))

app.get('/', (req, res) => {
    res.send('hi')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`backend server started on port ${port} at ${new Date()}`))