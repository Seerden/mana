# TODOs

| status | date | todo | 
:-- | :-- | :--
DONE | Oct 1 | set up db in mongoDB Atlas, include connection string in backend 
WIP | | set up frontend routes
WIP | | figure out database model structure
DONE | | add some word lists to play with
todo | | learn passport authentication with react/express
DONE | October 4 (am) | fix NewList formOutput format to work with db/list POST route
todo | | figure out list session structure
TODO | Oct 6 2:16| suspend list loading (bonus points: come up with a nice loading animation)
TODO | | custom list ids
TODO | | refine db list GET routes and frontend routes
WIP | | figure out useHistory and history.push() 
WIP | Oct 9 | Completely refactor review card component

- Get rudimentary review page done
- Refine list page
  - suspend u/username/lists loading
  - style lists
  - figure out stat priority (what _must_ be displayed on overview page?)

# NOTE
db schemas have collation with 'en' locale. if this causes issues, check if there's a way to specify multiple collation locales

## Review history
- frontend: whenever a term is passed/failed, append pass/fail to term's history.
    every term has a history property, like {date: sessionStart, content: ['pass', 'pass', 'fail']}
    @todo: define sessions more rigorously. continuing previous sessions, ending sessions, etc.

# 2020-10-13, 03:23
List:
    make a ListTerm component, and change terms to li elements


# 2020-10-15 03:15
list:
    .session: add boolean __finished__ property: on list page load, check for unfinished sessions and prompt continue/discard
        either disable 'review' button while prompt unhandled, or alert 'unfinished sessions will be discarded'
        - on continue: check unfinished session start date, then build a review session using session progress
        - on discard: go through each term, remove .history entry for this date

