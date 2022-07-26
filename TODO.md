`postgres/test/initialize`

-  [x] install jest and related deps
-  [x] add npm script to launch jest
   -  [x] include necessary environment variables
-  [x] write a few tests to start with
   -  [x] find IS_TEST_ENVIRONMENT variable
   -  [x] connect to test database
   -  [x] reset sequences
   -  [x] create user
   -  [x] query user
   -  [x] delete user

`modernize/resolvers/client`

-  [x] re-create term-related mutations and queries
   -  [x] implement term update mutations:
      -  [x] update from_language, to_language
         -  only current intended usecase: update the language(s) of a list and its
            Terms. Editing just a loose term's languages isn't really a thing since
            Terms are strictly tied to lists right now. As such, this should be done
            from `ListResolver`.
      -  [x] update from_value, to_value
      -  [?] update list_id
         -  this is more something for the future
-  [ ] refactor frontend implementation of the above queries and mutations and
       adapt usage to match new signatures.

-  [ ] implement term FieldResolver functions

   -  [x] TermResolver.saturation FieldResolver()
      -  [x] resolveTermSaturation()
   -  [x] TermResolver.history FieldResolver()
      -  [x] resolveTermHistory()

-  [ ] reconcile user on mount

## Authentication:

-  [x] create a useReconcileUser() function called from as high up in the
       component tree possible, that synchronizes client-side and server-side
       user session on mount.
-  [ ] refactor client-side authentication to use entire user object instead of
       just username.

   -  [ ] to preserve: the only case where we actually use username currently is in the user
          page route (/u/:username)

## List

-  [ ] trace data flow to final end-consumer hooks and components. Start
       refactoring from there

   -  [ ] list:

      -  useList

         -  useListFilter

            `termsToDisplay = filterTermsBySaturation(filter, truncatedTerms)`

            -  `filter` is defined here,
            -  `truncatedTerms` has a setter that's returned by this hook and used elsewhere
            -  `filterTermsBySaturation` returns a filtered version of `truncatedTerms`
               -  if we were to pass `Term[]` to this instead of `TruncatedTerm[]`,
                  none of its functionality would change

         -  useListPrepareReview
         -  useListUpdate

`modernize/refactor/list`

## List name update

-  [x] get list name update functionality to work again in `List.tsx`

## Filter

-  [x] rework and refactor list filter functionality in `List.tsx`.
   -  [ ] there is more functionality I want to add later down the line, but for
          now I'm happy. For later reference:
      -  [ ] clearer filter state descriptions
      -  [ ] accessibility.

## TermModal

### History

current props flow:

ListTerm.tsx
renders TermModal

TermModal
handleConfirmClick ListTerm::useListTerm
setOpen, ListTerm::useListTerm
term, List.tsx::ListTerm props
handleTermEdit, ListTerm::useListTerm

    confirmingDelete,       ListTerm::useListTerm
    setConfirmingDelete,    ListTerm::useListTerm

      {set}confirmingDelete are created in useListTerm, which is loaded in ListTerm, and passed as props to TermModal. ListTerm doesn't use these otherwise.

      in useListTerm:
      -  handleConfirmClick uses setConfirmingDelete
      -  on unmount, setConfirmingDelete(false) is called
