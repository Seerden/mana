require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { dbRouter } = require('./routers/dbRouter');
const { testRouter } = require('./routers/testRouter');
const app = express();

const log = (req, res, next) => {
    console.log(req.originalUrl);
    next()
}

app.use(log)

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use('/db', dbRouter)
app.use('/test', testRouter)


app.get('/', (req, res) => {
    res.send('Index route')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`backend server started on port ${port} at ${new Date()}`))