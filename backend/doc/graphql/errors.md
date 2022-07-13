Apollo-server has some built-in error types that we can throw. This is preferred
to returning data with, for example, an `error` or `message` field, as that
doesn't indicate clearly enough that we are dealing with an error. This also
simplifies typing on queries and mutations, since we don't have to manually
extendor wrap every return type (like `User`->`MaybeUser`)

See (the apollo-server
documentation)[https://www.apollographql.com/docs/apollo-server/data/errors/]
for details.
