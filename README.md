# Mana App
## About
Spaced-repetition based (language) learning application. 

Project built for personal use, but also as portfolio project.

## Stack

- ### React frontend:
    - bootstrapped with Create-React-App,
    - React-Query as GraphQL fetching library.
- ### Node.js backend: 
    - Express and Apollo-Server-Express as HTTP and GraphQL servers.
    - Type-GraphQL for GraphQL implementation.
    - MongoDB (Mongoose) hosted on http://cloud.mongodb.com/.
        - TypeScript implementation through Typegoose.
    - Session-based authentication using Express-Session with (Type-)GraphQL middleware

### Tech
- JWT for frontend authentication, combined with Passport on the backend to protect API/DB calls.
- D3.js for data visualisation.

## Status
Alpha stage. Imcomplete feature set. Currently transitioning to TypeScript and GraphQL. Some API endpoints are broken during this transition.