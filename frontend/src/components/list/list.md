## List refactor
Thoughts for possible changes or refactoring opportunities.

### Button banner
  - review buttons on one side ('review entire list', 'review selected terms')
  - expandable "more" modal on the other side
    - includes ('delete list' button, which definitely needs an 'are you sure?' layer)

### Saturation filter
- @todo: Include reset-like 'show all terms' option.

### Review only selected terms
Two types of reviews are available for a single List:
- Complete review: Review every single term.
- Partial review: Review only user-specified terms.

Add a button inside 'terms' block to toggle checkmarks ('select this term for review'). Include a piece of state to track the terms that have been checked. 

Allow 'select all displayed terms'.

If at least one (but not every single) term has been selected, render a 'review selected terms' button.

### Layout
Currently displaying list info and sets at the top, and terms below that, extending as far as necessary. Instead, think about starting sets at the top, and having list info, sets, and any other utility/info blocks to the right side, collapsing to top-down on small screens.

### TermHistory
Allow filtering by direction.

# Flow
[]      setGetRequest       -->     setList, setListArom
[list]  updateTerms()       -->     setTerms({term, element})  // term is the term info from the DB, element is the JSX to render

## Terms to render:
terms
    .filter( -filter by saturation- )
    .map( term => term.element )
