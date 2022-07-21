This document explains how we set up and interact with our GraphQL server.

## Dependencies

### Client-side

We use `react-query` to manage our data fetching, along with the `graphql-request`
library to create GraphQL queries, mutations, fragments, etc.

### Server-side

We use TypeGraphQL to generate our types and resolvers, and plug these into
apollo-server-express, which exposes our GraphQL server.

### Codegen

The above-mentioned apollo-server-express/TypeGraphQL implementation exposes a
`backend/schema.gql` file containing the entire GraphQL schema.

In the root directory of this project we have access to npm package
graphql-codegen, with a few plugins. We can run the codegen manually with `npx graphql-codegen --watch "./backend/schema.gql"`, which generates a file
`frontend/src/gql/codegen-output.ts` containing a bunch of types relating to our
GraphQL schema.

## Tools

The VSCode GraphQL plugin works very well to type-check graphql operations.
Combined with the output from the codegen, it's relatively straightforward to
implement queries and mutations.

## Implementation

Implementing a query or mutation:

-  backend:
   -  define TypeGraphQL types and resolvers
   -  run codegen using exposed schema
-  frontend:
   -  create gql string
   -  create actual request
   -  wrap request in react-query hook
