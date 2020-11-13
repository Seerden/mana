## List refactor
Thoughts for possible changes or refactoring opportunities.

### Button banner
  - review buttons on one side ('review entire list', 'review selected terms')
  - expandable "more" modal on the other side
    - includes ('delete list' button, which definitely needs an 'are you sure?' layer)

### Saturation filter
- @todo: Include reset-like 'show all terms' option.

### Review only selected terms
Need to link Review component to List component through `termsToReviewState` atom.

Add a button inside 'terms' block to toggle checkmarks ('select this term for review'). Include a piece of state to track the terms that have been checked. 

Allow 'select all displayed terms'.

If at least one (but not every single) term has been selected, render a 'review selected terms' button.

### Layout
Currently displaying list info and sets at the top, and terms below that, extending as far as necessary.

Instead, think about starting sets at the top, and having list info, sets, and any other utility/info blocks to the right side, collapsing to top-down on small screens.

### TermModal
Leave less whitespace at top on smaller screens. Even fullscreen 1080p looks unbalanced currently.

### TermHistory
Include direction of review for every single entry. Allow filtering by direction.