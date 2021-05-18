import 'dotenv/config';

import express from 'express';
import { devRouter } from './routers/devRouter'

import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { v4 as uuid } from 'uuid'

import { dbConn } from './db/db';
import { dbRouter } from './routers/dbRouter';

import { buildSchema } from 'type-graphql';
import { ListResolver } from './graphql/resolvers/ListResolver';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { TermResolver } from './graphql/resolvers/TermResolver';
import { inspectDatabase } from './lib/inspectDb';
import { log } from './lib/expressMiddleware';

const MongoStore = connectMongo(session);
import mongoose from 'mongoose';

// mongoose.set('debug', true);

async function startServer() {
    const app = express();

    app.use(log);

    app.use(express.urlencoded({ limit: '5mb', parameterLimit: 10000, extended: true }));
    app.use(express.json());
    app.use(session({
        "name": "mana-session",
        genid: () => uuid(),
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: dbConn
        }),
        cookie: {
            maxAge: 1000 * 3600 * 24,  // TTL in milliseconds
            // secure: true // only set once I have https setup look at docs for handy if statement to set this only for production
        },
        resave: true,
        saveUninitialized: false,
        rolling: true,
    }));

    app.use('/db', dbRouter);
    app.use('/dev', devRouter);

    const schema = await buildSchema({
        resolvers: [UserResolver, ListResolver, TermResolver],
        emitSchemaFile: true
    });

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({ app });

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`Server started on port ${port} at ${new Date()}`);
        console.log('Models:', dbConn.modelNames());
    });

    await inspectDatabase();
}

startServer();