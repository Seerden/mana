As obvious from the name, spaced repetition places a lot of emphasis on the
_spacing_. You don't have to review things you already know very well as often
as things you don't know very well yet.

This application works with a level-based system. Each Term is assigned a
'saturation' level, which is a measure of how well the user knows the Term, and
thus how often they should be reviewing it.

After every review session, the saturation of a Term is re-assessed based on the
user's performance in the _current_ session, but also on that of their previous
few sessions.

## Levels

We use five `saturation` levels. In the codebase, a saturation level is mapped to the domain
[0,4], with 0 loosely meaning 'very bad to no recollection', to 4 meaning
'very good recollection'

## Progression

### Maximum change per review

After a review, a saturation level can change, or remain the same. The level can
increase at most by 1 level after a review, with the sole exception being a
flawless 'seeding' progression (see `seeding.md`), where a term can jump from 0
to 2 after the final seeding session. The level could also decrease, by at most
2 levels, after a review.

### Level-based progression conditions

We use a relatively straightforward decision tree to determine what happens to a
saturation level based on the current saturation level, the user's recollection
in the latest session, and depending on the current level, also on the user's
recollection from the, at most two, previous sessions.

### Constraints on progression

The emphasis on spacing is reinforced in the codebase. Reviewing a term too
quickly (determined by its current level) will mean the review is not counted
towards progression.

#### Example of a negated session

Say a term has current saturation `{forwards: 0, backwards: 0}`. This term should ideally
be reviewed once a day in each direction (we should allow for some lenience, e.g. a review one evening
and then the next afternoon should be fine). If the user reviews the term two
hours after their last review, then we shouldn't count the review. Short-term
recollection and long-term recollection are not the same.

For the sake of simplicity, we won't consider different types of reviews
differently when evaluating saturation updates. It's up to the user to decide
which style of reviewing they prefer.
