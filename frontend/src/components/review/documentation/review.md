@todo: term histories are currently given sessionStart as date. Update this to take actual moment of clicking 'pass'

### Reviewing only certain terms:
Instead of accessing review through /u/username/list/id/review,
we'll be at /u/username/review.

This means we need to initialize the terms to review differently.

#### Current thinking:
- termsToReview atom:
 - set this either from the list or set we want to review

NOTE: navigating off /list/id or term/id page should clean up termsToReview state. Don't want to select a few terms, navigate to another list, select some more terms, and review cross-list terms that way.

### @TODO:
buttons are shown based on !!backWasShown, this means simulated click doesn't show hover animation,
        since backWasShown is triggered immediately on click