import 'dotenv/config.js';
import dayjs from 'dayjs';

import express from 'express';
import { dbRouter } from './routers/dbRouter.js'
import { devRouter } from './routers/devRouter.js'
const app = express();

/**
 * Express middleware to log every route that is hit
 */
const log = (req, res, next) => {
    console.log(`${dayjs(new Date()).format('MMM DD @ HH:mm')} - ${req.method} ${req.originalUrl}`);
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