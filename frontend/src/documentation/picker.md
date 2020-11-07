# Picker component:

@input: Array (e.g. all lists by a user),

Purpose: contains a _filterable_ list of names (e.g. list names), which on click get added to a return object
@note return object could be a piece of state in the parent, that gets updated from Picker as user picks items

Structure of the `PickerElement`s  is like:
```javascript
    {
        _id,
        name,
        element
    }
```

- `element`: PickerElement (JSX),
- filter by `name` as user refines their search,
- `id` and `name` will be appended to the return object.


Filter:
- show entire overview of lists. let user click until satisfied. then add all clicked lists.