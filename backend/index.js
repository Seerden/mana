require('dotenv').config();

const express = require('express');
const { dbRouter } = require('./routers/dbRouter');
const { testRouter } = require('./routers/testRouter');
const app = express();


/**
 * Express middleware to log every route that is hit
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const log = (req, res, next) => {
    console.log(`${new Date()} - ${req.originalUrl}`);
    next()
}

app.use(log)

app.use('/db', dbRouter)
app.use('/test', testRouter)


app.get('/', (req, res) => {
    res.send('Index route')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`backend server started on port ${port} at ${new Date()}`))