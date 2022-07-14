import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { v4 as uuid } from "uuid";
import { authenticationChecker } from "./graphql/helpers/authorization";
import { ListResolver } from "./graphql/resolvers/ListResolver";
import { ReviewSessionEntryResolver } from "./graphql/resolvers/ReviewSessionEntryResolver";
import { ReviewSessionResolver } from "./graphql/resolvers/ReviewSessionResolver";
import { TermResolver } from "./graphql/resolvers/TermResolver";
import { UserResolver } from "./graphql/resolvers/UserResolver";
import { log } from "./lib/expressMiddleware";

async function startServer() {
   const app = express();
   app.use(cors());
   app.use(log);
   app.use(express.urlencoded({ limit: "5mb", parameterLimit: 10000, extended: true }));
   app.use(express.json());
   app.use(
      session({
         name: "mana-session",
         genid: () => uuid(),
         secret: process.env.SESSION_SECRET,
         /* store: TODO: Implement redis store! */
         cookie: {
            maxAge: 1000 * 3600 * 24, // set TTL to 24 hours
            // secure: true // only set once I have https setup look at docs for handy if statement to set this only for production
         },
         resave: true,
         saveUninitialized: false,
         rolling: true,
      })
   );

   const schema = await buildSchema({
      resolvers: [
         UserResolver,
         ListResolver,
         TermResolver,
         ReviewSessionResolver,
         ReviewSessionEntryResolver,
      ],
      emitSchemaFile: true,
      authChecker: authenticationChecker,
      // globalMiddlewares: [],
   });

   const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
   });

   server.applyMiddleware({ app });

   const port = process.env.PORT || 5000;

   app.listen(port, () => {
      console.log(`Express server started on port ${port} at ${new Date()}`);
   });
}

startServer();
