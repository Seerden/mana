import React, { useMemo } from 'react';
import { useRouteProps } from './routerHooks';
import { reviewSettingsState, termsToReviewState, timePerCardState, passfailState } from 'recoil/atoms/reviewAtoms';
import { useRecoilValue } from 'recoil';
import { convertDateListToDeltaTime } from 'helpers/reviewHelpers';

function useReviewSession() {
    const { params, location } = useRouteProps();
    const reviewSettings = useRecoilValue(reviewSettingsState);
    const termsToReview = useRecoilValue(termsToReviewState);
    const timePerCard = useRecoilValue(timePerCardState);
    const passfail = useRecoilValue(passfailState);

    const newReviewSession = useMemo(() => ({
        owner: params.username,
        listIds: location.pathname.includes('list') ? [params.id] : [],  // @todo: make this work with set reviews
        date: {
            start: reviewSettings.sessionStart,
            end: reviewSettings.sessionEnd
        },
        terms: [{listId: params.id, termIds: termsToReview.map(term => term._id)}],  // @todo: again, make this work with set reviews
        settings: {
            cycles: reviewSettings.n,
            direction: reviewSettings.direction
        },
        timePerCard: convertDateListToDeltaTime(timePerCard, reviewSettings.sessionStart),  // @todo: convert dates to deltatime 
        passfail: passfail
    }), [params, location, reviewSettings, termsToReview, timePerCard, passfail])

    return newReviewSession;
}

export default useReviewSession;