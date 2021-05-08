import 'dotenv/config.js';
import dayjs from 'dayjs';

import express, { Request, Response } from 'express';
import { dbRouter } from './routers/dbRouter.js'
import { devRouter } from './routers/devRouter.js'

import { ApolloServer } from 'apollo-server-express';

import { dbConn } from './db/db.js';
import { buildSchema } from 'type-graphql';
import { UsersResolver } from './graphql/resolvers/users.js';
import { HelloResolver } from './graphql/resolvers/hello.js';

/**
 * Express middleware to log every API call that is accessed
 */
function log(req: Request, res: Response, next: Function) {
    if (!req.originalUrl.includes('graphql')) {
        console.log(`${dayjs(new Date()).format('MMM DD @ HH:mm')} - ${req.method} ${req.originalUrl}`);
    }

    next();
}

async function startServer() {
    const app = express();

    app.use(log)

    app.use('/db', dbRouter)
    app.use('/dev', devRouter)

    app.get('/', (req, res) => {
        res.send('Index route')
    })

    const schema = await buildSchema({
        resolvers: [UsersResolver, HelloResolver]
    })

    const server = new ApolloServer({ schema })
    server.applyMiddleware({ app });

    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`Server started on port ${port} at ${new Date()}`);
        console.log('Models:', dbConn.modelNames());
    })
}

startServer();