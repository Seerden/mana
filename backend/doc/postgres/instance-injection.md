The `postgres` package initiates a new connection every time sql`` is called.

To illustrate by example, in the following case, the username will update, but
the rollback call will not act to rollback the update, since the transaction
it's trying to rollback has already completed.

```typescript
import { sql } from "..."; // This is the exposed connection
function updateUsername(user_id, username) {
   return sql`update users set ${{ username }} where user_id=${user_id}`;
}

function testUpdateUsername() {
   await sql.begin(async (tx) => {
      const user = { username: "test", user_id: 1 };
      await updateUsername(user.user_id, user.username);

      await tx`rollback`;
   });
}
```

The `sql` connection inside `updateUsername()` is not the same one as the one we
use in `sql.begin` inside `testUpdateUsername()`.

As a result, we have to make every query take an instance as argument.

```typescript
import { sql } from "...";

function testUpdateUsername() {
   await sql.begin(async (tx) => {
      const user = { username: "test", user_id: 1 };
      const updatedUser = await updateUsername(tx, user.user_id, user.username);
      await tx`rollback`;
   });
}
```
