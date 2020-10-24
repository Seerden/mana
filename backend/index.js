require('dotenv').config();

const express = require('express');
const { dbRouter } = require('./routers/dbRouter');
const { devRouter } = require('./routers/devRouter');
const app = express();


/**
 * Express middleware to log every route that is hit
 */
const log = (req, res, next) => {
    console.log(`${new Date()} - ${req.originalUrl}`);
    next()
}

app.use(log)

app.use('/db', dbRouter)
app.use('/dev', devRouter)


app.get('/', (req, res) => {
    res.send('Index route')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`backend server started on port ${port} at ${new Date()}`))