A review can be initiated in various ways. What's important for a
`<ReviewPage />` component to render properly is the URL. The URL, including
(search) params, deterministically decides which terms will be fetched for the
review. Review settings can also be adjusted by the user through the settings in
`<PreReview />`.

-  ReviewPage, using the URL and settings from PreReview, sends a query
   requesting a specific set of terms. This list of terms is transformed in the
   query hook (through `select`) into a shuffled list of terms to-be-reviewed.
   This shuffled list is then passed as a prop to
   `<Review />`.

-  The query select mentioned above is naive. In ReviewPage, we refetch the query
   whenever reviewParams or reviewSettings.n changes (reviewParams decides which
   terms are fetched, and reviewSettings.n is needed to make the shuffled list).
   We could instead split up the query's return type to have a `rawTerms` and a
   `cardTerms`. Then we would amend the logic as follows:
   -  only refetch when reviewParams changes
   -  if `reviewSettings.n` changes, `rawTerms` doesn't change, but we can re-set
      `cardTerms` by re-building the shuffled list using the updated
      `reviewSettings.n` value. This would be done through `queryClient.setQueryData(...)`
