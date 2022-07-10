# Folder structure

-  Try to co-locate things related to one feature/component/page as much as
   possible.
-  Try to flatten subfolders as much as possible. Only go to subfolders for
   subcomponents if there's a good reason, like a single subcomponent has
   a lot of helpers, state, etc. Typically, even then, prefer putting these
   `{hook|state|helper}` files in the top-level component's
   `/{hooks|state|helpers}` subfolder.

### Notes

-  It's typically relatively easy to find files in their subfolders if the
   folders are named well, but it's good
   to consider not naming things too generically. In the below example, consider
   the implications of naming a state atoms file `atoms`, instead of more
   specifically `reviewAtoms`.

## Example

Take the Review page folder structure as an example:

### Good:

```
|- components/Review
   |-- ReviewPage
   |-- /sub
      |-- ReviewInfo.style
      |-- ReviewInfo
   |-- /hooks
      |-- usePostReview
   |-- /state
      |-- {reviewAtoms|atoms}
      |-- {reviewSelectors|selectors}
   |-- /helpers
      |-- build-term-list
```

### Bad:

```
|-- /components/Review
   |-- /ReviewInfo
      |-- ReviewInfo
      |-- ReviewInfo.style
...
|-- /hooks
   |-- /review
      |-- usePostReview
...
|-- /state
   |-- /review
      |-- reviewAtoms
      |-- reviewSelectors
```

### Up for preference:

-  Rare helpers file inside subcomponents folder. The more files are involved
   here, the stronger the argument for extracting to some type of subfolder becomes.

   -  Inside subcomponents folder:

      ```
      |--- components/List/sub
         |-- ListTitleBar.tsx
         |-- ListTitleBar.style.tsx
         ...
         |-- HistoryElement.tsx
         |-- get-history-element-data.ts
      ```

   -  Inside helpers folder

      ```
      |-- components/List
      |-- /sub
         |-- ListTitleBar.tsx
         |-- ListTitleBar.style.tsx
         ...
         |-- HistoryElement.tsx
      |-- /helpers
         |-- get-history-element-data.ts
      ```

   -  Create subcomponent subfolder as soon as it has direct descendants
      -  flat
         ```
         |-- components/List/sub
            |-- ListTitleBar.tsx
            |-- ListTitleBar.style.tsx
            ...
            |-- /HistoryElement
               |-- HistoryElement.tsx
               |-- get-history-element-data.ts
         ```
      -  function-based subfolders
         ```
         |-- components/List/sub
            |-- ListTitleBar.tsx
            |-- ListTitleBar.style.tsx
            ...
            |-- /HistoryElement
               |-- HistoryElement.tsx
               |-- /helpers
                  |-- get-history-element-data.ts
         ```
