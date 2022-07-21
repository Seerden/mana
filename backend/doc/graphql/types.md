GraphQL types:

For a given database model, we typically will end up with at least one GraphQL
type that very closely matches the database table definition.

Example: `Term`

TypeScript type:

```typescript
type Term = {
   user_id: number;
   list_id: number;
   from_language: string;
   to_language: string;
   from_value: string;
   to_value: string;
};
```

As a GraphQL type this could be implemented slightly differently - user_id and
list_id are `Int`s instead of `Float`s, for example, but otherwise the relation
is mostly 1:1.

When interacting with a database table through GraphQL operations, we can
largely distinguish one major sub-type: the input type. When creating a
new instance of e.g. a Term, there will be no `term_id` until the row is created
in the database. Depending on how the term is being created, other `*_id`s might
also not be present.

When defining (using TypeGraphQL) these types, keep the following in mind:

-  co-locate type definitions as much as possible
   -  example: Term-related types are defined in `backend/graphql/types/Term.ts`
-  create a base input type matching the most likely use-case, and extend that
   input type to form the final type

   -  example:

      ```typescript
         @ObjectType()
         @InputType()
         export class TermInput {
            ... {all Term fields except term_id}
         }

         @ObjectType()
         export class Term extends TermInput {
            @Field(() => Int)
            term_id: number;
         }
      ```

   -  depending on the complexity of the type and the frequency of usage, we might need access to more sub-types, e.g.
      an even more stripped-down input type that also doesn't include a `user_id`
      or `list_id`. In that case, explicitly name the type something like
      `TermWithoutUserId` or `TermWithoutIds`. In this case, it might also be a
      good idea to rename `TermInput`->`TermWithoutId`, `TermInputWithoutId`,
      or similar.

For the sake of reference, my preference for a final set of typedefs for this Term example would be:

```typescript
@ObjectType()
@InputType(...)
class TermWithoutIds {
   ... {fields except *_id}
}

@ObjectType()
@InputType(...)
class TermWithoutId extends TermWithoutIds {
   @Field(...)
   user_id: number;

   @Field(...)
   list_id: number;
}

@ObjectType()
@InputType(...)
class Term extends TermWithoutId {
   @Field(...)
   term_id: number;
}

```
