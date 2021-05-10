import 'dotenv/config';
import dayjs from 'dayjs';

import express, { Request, Response } from 'express';
import { devRouter } from './routers/devRouter'

import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import passport from './auth/passport';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);
import {v4 as uuid } from 'uuid'

import { dbConn } from './db/db';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './graphql/resolvers/hello';
import { ListResolver } from './graphql/resolvers/ListResolver';
import { dbRouter } from './routers/dbRouter';
import { UsersResolver } from './graphql/resolvers/users';

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

    app.use(express.urlencoded({ limit: '5mb', parameterLimit: 10000, extended: true }));
    app.use(express.json());
    app.use(session({
        genid: () => uuid(),
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: dbConn
        }),
        cookie: {
            maxAge: 1000 * 3600 * 24,  // TTL in milliseconds
            // secure: true // only set once I have https setup look at docs for handy if statement to set this only for production
        },
        // store: @todo add mongo connect
        resave: true,
        saveUninitialized: true,
        rolling: true,
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/db', dbRouter)
    app.use('/dev', devRouter)

    app.get('/', (req, res) => {
        res.send('Index route')
    })

    const schema = await buildSchema({
        resolvers: [UsersResolver, HelloResolver, ListResolver],
    })

    const server = new ApolloServer({ 
        schema,
        context: ctx => ctx,
     })
    server.applyMiddleware({ app });

    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`Server started on port ${port} at ${new Date()}`);
        console.log('Models:', dbConn.modelNames());
    })
}

startServer();