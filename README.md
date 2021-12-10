# Mana App

## About

Spaced-repetition based (language) learning application.

Project built for personal use, but also as portfolio project.

## Stack

-   ### TypeScript/React frontend:
    -   Webpack for bundling,
    -   Jest for unit tests
    -   react-query as GraphQL fetching library.
    -   recoil for state management
-   ### TypeScript/Node.js backend:
    -   Express and Apollo as HTTP and GraphQL servers.
    -   TypeGraphQL for GraphQL implementation.
    -   MongoDB (Mongoose) hosted on http://cloud.mongodb.com/.
        -   TypeScript implementation through Typegoose.
    -   Session-based authentication using express-session with (Type-)GraphQL middleware

## Status

-   Ironing out complete feature set
-   Currently considering transitioning from MongoDB to Postgres
-   Transitioning from BEM SCSS to SCSS modules
    -   Simultaneously working on homogeneizing styling to make theme switching easier
-   Working on dockerizing the entire application
