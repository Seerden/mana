## Styling

### Page title

-  [x] "New List" doesn't appear to have any styling. Use shared page title, section
       header, or some other shared title styling

### List name

-  [x] don't center "List name" title/header
-  [-] consider using "List name" as placeholder instead of "week 3 vocabulary"
   -  [x] updated placeholder string
-  [x] use different color for input -- white is too harsh
-  [x] slightly decrease placeholder font size so that it fits on large
       viewports (width >= 1920px)
-  [x] also use justify-content: space-between on medium viewports (where name
       and languages are side-by-side, but terms is below it)

### Languages

-  [x] don't put languages inside a box
-  [x] add padding to language inputs
-  [x] use different active background color -- dark grey -> white too harsh

### Buttons

-  [x] left-align buttons on width >= 1920px (and remove left-padding
       accordingly), but keep right alignment on smaller viewports
-  consider more buttons
   -  in addition to 'add rows', add 'remove empty rows'
   -  display number of rows to-be-added with 'Add rows' button
   -  [x] make button bar sticky/fixed
-  [x] add outline style to buttons

### Terms

-  [x] language header: `from_language` needs to be indented so as not to overlap
       with term index number
-  [x] right box-shadow of from_value overlaps with left box-shadow of to_value
-  [x] don't scale input up so much on :active
-  [x] TermsHeader: match `to_language` label width to `term.to_value` width
   -  matching this with hard-coded padding right now. Probably want to use
      proper variables.

## Functionality

-  [x] prevent submission of invalid list:
   -  [ ] disable 'create list' button if newList isn't valid
   -  [ ] validate `name` and `languages` to have length > 0.
-  [-] ~~fix terms clearing out when adding new rows~~
   -  already fixed
