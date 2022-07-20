### `apollo-server` error propagation

Apollo-server has some built-in error types that we can throw. This is preferred
to returning data with, for example, an `error` or `message` field, as that
doesn't indicate clearly enough that we are dealing with an error. This also
simplifies typing on queries and mutations, since we don't have to manually
extendor wrap every return type (like `User`->`MaybeUser`)

See (the apollo-server
documentation)[https://www.apollographql.com/docs/apollo-server/data/errors/]
for details.

### Postgres error propagation

Postgres also throws errors automatically when it encounters issues. From above,
it follows that, when the query traces back to a resolver function, it's
propagated by apollo-server to the `errors` field of the resolver result. This
means that it'sproper to do something like:

-  GOOD

```typescript
const [user] = await sql<[User?]>`insert into users ${sql(newUser)} returning *`;
return user;
```

-  NOT NECESSARY

```typescript
try {
   const [user] = await sql<[User?]>`insert into users ${sql(newUser)} returning *`;
   return user;
} catch (e) {
   throw e;
}
```

We don't have to wrap simple `sql()/sql`\`\` queries in try..catch` blocks. Note
that if we can reasonably expect a function to also in some cases be called from
_outside_ a GraphQL resolver, then we should manually handle errors, somewhere.
An alternative to throwing errors is letting Sentry handle things, or we can
create an error handler very high up somewhere.

TODO: Perhaps there's an `express` built-in way of doing this. Anything beats
manually wrapping everything in `try..catch` blocks.
