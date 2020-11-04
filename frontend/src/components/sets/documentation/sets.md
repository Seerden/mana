# Sets

Allow the user to group any number of lists into a set.

### Functionality:
A set acts as an aggregrate for lists the user deems similar in some way. The user might want to review these lists collectively, for example or want to view data (e.g. learning progress, history) about these sets as a whole.

### Database:
In the database, a set will contain:
- owner (username)
- set name
- set description
- array of tags
- array of references to list ids.

## Todo
### Frontend:
- Set: 
  - [] create entire component, 
  - [] implement page
- List: 
  - [] display set membership
  - [] allow user to add the list to sets
    - implement API handlers
### Backend (API):
- implement API routes for the following:
  - set creation
  - set updating (at Set document)
  - appending list to set (at List document) (.put(/list) might already work)
### Database: 
- [x] implement setSchema
- [x] import setSchema in any relevant files