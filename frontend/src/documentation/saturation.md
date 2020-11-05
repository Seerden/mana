
# Term saturation, i.e. 'how well do I know this term?'

Factors to consider

- How long has it been since I reviewed the term?
- How well did I know the term before the review I just did?
- How did I do on the review just now?

We're building up satiation over time. Start from scratch right after a list/term was created, build from there. This means to be able to to set satiation after each review, we should only need current satiation, elapsed time since last review, and current review performance.

Grouping has to be done to some degree of genericity:

## Idea: Buckets
| # | knowledge level | review time scale |
:--|:--|:--|
| 0 | seeding: term hasn't been reviewed often enough to make a good judgment | $\leq$ 24 hours
| 1 | settling: past the initial learning phase (e.g. 3 sessions separated by a day each). might know term well _now_, but it's only in short-term memory, so we have to stay on top of reviewing it if we want to move on to the next stage  | $1 < t \leq 3$ days
| 2 | good short-term recall, slowly moving towards long-term recollection  | $3 < t \leq 7$ days
| 3 | on the track towards long-term recollection. spaced out, but consistent reviewing necessary | $1 < t \leq 3$ weeks
| 4 | long-term knowledge. term can be regarded as 'ingrained' | $>$ 3 weeks

### Advantages, disadvantages
Clearly defined guidelines for satiation progression. Might be a negative: could need more specificity. How likely are we to need more than 4 levels, though? High review frequency means we could just scale the review timescales to our needs.

## Case study
2200 kanji, each with ~ two vocab items $\Rightarrow$ say we have 4000 terms. Could incrementally get the last of them to short-term recall, at which point the first terms will be in long-term recall. Estimate 100 words in 'progressing to long-term recollection' at one time.

# Sets, subgroups
We need satiation because list-based studying only works up to a certain point. If there's only a single word in a list I don't quite know, it's wildly inefficient to review the entire list along with the one term, but there's also little point to reviewing just the single term.

-----

# Seeding first
Seed an entire list at a time - only allow for reviewing subsets and cross-list terms after initial seeding period.

Seeding consists of a few initial review sessions. Say three review sessions initially, where every term should be passed `n` times (`n`=2 for me by default) for session completion. These initial sessions should be spaced at least a day apart to begin with. Could be strict about enforcing spacing here, but is more trouble than it's worth. If there's week between sessions, recollection will be worse and satiation after the initial sessions will reveal this anyway.

## Gradient

General saturation gradient (best to worst):
- no mistakes: 
- no mistake first time, one mistake thereafter
- mistake first time, no mistakes afterwards:
- mistake first time, one or more mistakes after (n_correct >= n_mistake)
- n_mistake > n_correct