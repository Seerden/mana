# View components

## ReviewPage

-  [x] use switch case in render instead of memoized ReviewStageToRender -- reads a
       lot beter

## PreReview

## Review

## PostReview

# Functionality

## Hooks and control flow

-  `useReview:`

   -  memo initialTerms = makeReviewList() [termsToReview, reviewSettings.n]
   -  [remainingTerms] = useState(initialTerms)

   -  effect:
      setRemainingTerms(initialTerms)
      [termsToReview, reviewSettings.n]

   -  updateRemainingTerms:
      setRemainingTerms(...switch case)

-  [x] refactor state combination of:

   -  termsToReview
   -  initialTerms
   -  remainingTerms
   -  related intermediate state, setters, handlers, helpers

   The new system will work as follows:

   -  ReviewPage handles fetching the necessary terms. It does this after
      determining the type of review we're in from route params (e.g.
      `/u/:user_id/review` will require an additional step in PreReview to
      determine the terms to-be-reviewed, but
      `/u/:user_id/list/:list_id/review?min_saturation=2` describes exactly which
      terms are needed)

      A nice thing here is that we could optionally pre-fill
      various review settings from optional quer params if we wanted to.

   -  PreReview renders, optionally with the new step that allows the user to
      manually select the terms/lists/sets/filters they want to apply that result
      in a list of terms to-be-reviewed.

   -  Once PreReview flow is complete, we conditionally move on to Review if
      there are terms to-be-reviewed. This prevents a lot of state messiness
      because Review will just take an already shuffled list of terms.

   ### Progress:

   -  have to work across a bunch of files to get _any_ of them to work.
   -  useInitializeReview() was previously called from useReview, but now we
      want to use it in ReviewPage (or useReviewPage or something similar). The
      functionality also needs to be upgraded to work with what's outlined here
      and in the comments in-file.
   -  [x] am combining cardTerms and remainingTerms into global state so we don't
          have to prop-drill it.
   -  need a typeguard/validator for session and entries (am force-casting
      them now temporarily) for the mutation

      #### Progress 03/08/2022

      -  realized that we can use the useQuery `select` property to transform
         raw terms from request to shuffled list of terms through makeReviewList

         TODO:

      -  [x] fix `session` parameter of mutation to not need user_id since we want
             to insert this server-side if possible.

## API

### Server-side

The helper functions for the resolvers, and the actual resolvers themselves,
do not have all the functionality we need yet.

-  [x] re-implement mutation that creates `review_session_entry` and
       `review_session` rows.

   I have some ideas for this that can make review sessions resumable, but for
   now we will only call a mutation once on review session completion.

-  [ ] implement mutation for `term.saturation` update. Ideally this should happen
       as a side-effect to a review session (entry) INSERT -- we don't want this to
       be user-triggered directly, but we don't really care to protect against insertion of
       faked review sessions so it doesn't really matter regardless.
