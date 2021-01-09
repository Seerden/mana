@useReview/ReviewCard/Review.jsx ::
scenario:
    card is shown. flip card to the backside. mark incorrect. the same term shows up right away, again. It will still be showing the backside, when it should instead be showing the front.
solution:
    - reset 'side' whenever a new card is shown.
        - issue might be an incorrect key
        - possibly create 'sideShowing' state, and reset this from useReview on left/right arrow handler.
