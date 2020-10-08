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

- Get rudimentary review page done
- Refine list page
  - suspend u/username/lists loading
  - style lists
  - figure out stat priority (what _must_ be displayed on overview page?)

# NOTE
db schemas have collation with 'en' locale. if this causes issues, check if there's a way to specify multiple collation locales