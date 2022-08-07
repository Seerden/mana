# Mana App

## About

Spaced-repetition based (language) learning application.

Project built for personal use, but also as portfolio project.

## Stack

-  ### React frontend:
   -  bootstrapped with Create-React-App,
   -  React-Query as GraphQL fetching library.
-  ### Node.js backend:
   -  Express and Apollo-Server-Express as HTTP and GraphQL servers.
   -  Type-GraphQL for GraphQL implementation.
   -  MongoDB (Mongoose) hosted on http://cloud.mongodb.com/.
      -  TypeScript implementation through Typegoose.
   -  Session-based authentication using Express-Session with (Type-)GraphQL middleware

### Tech

-  VisX for data visualisation.

## Status

Alpha stage. Imcomplete feature set. Currently transitioning to TypeScript and GraphQL.

## Developing locally

[WIP]

### Environment variables

Certain environment variables need to be present: - [TODO]

### Re-generating graphql typescript types across the stack:

Run the following command from the top-level directory (i.e. the directory this
README exists in):

```bash
   npx graphql-codegen --watch './backend/schema.gql'
```

### Development scripts

-  Containerized application:
   ```
      npm run dock
   ```
-  Storybook:
   ```
   cd frontend && npm run storybook
   ```
-  Run tests:
   -  Backend:
      ```
      npm run test-back
      ```
