Access to specific queries and mutations is granted using user_ids. For most
queries, users are only allowed to access their own data.

If the `user_id` passed as an argument to the relevant query/mutation matches
the active session's `userId`, then we grant access. Otherwise, we throw a `ForbiddenError`
