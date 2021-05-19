import React, { useMemo } from 'react';
import { useRouteProps } from './routerHooks';
import { reviewSettingsState, termsToReviewState, timePerCardState, passfailState } from 'recoil/atoms/reviewAtoms';
import { useRecoilValue } from 'recoil';
import { convertDateListToDeltaTime } from 'helpers/reviewHelpers';
import { Id, IdInput, ReviewSessionBaseInput, ReviewSessionTermsInput } from 'graphql/codegen-output';

function useReviewSession() {
    const { params, location } = useRouteProps();
    const reviewSettings = useRecoilValue(reviewSettingsState)
    const { direction, sessionEnd, sessionStart, n, started, ended } = reviewSettings;
    const termsToReview = useRecoilValue(termsToReviewState);
    const timePerCard = useRecoilValue(timePerCardState);
    const passfail = useRecoilValue(passfailState);

    const newReviewSession = useMemo<ReviewSessionBaseInput>(() => ({
        owner: params.username,
        listIds: location.pathname.includes('list') ? [{_id: params.id}] as unknown as Id[] : [] as Id[],  // @todo: make this work with set reviews
        date: {
            start: sessionStart,
            end: sessionEnd
        },
        // @ts-ignore - expects IdInput, but I'm giving it a string. same thing. @todo fix on backend
        terms: {listId: params.id, termIds: termsToReview.map(term => term._id)},  // @todo: again, make this work with set reviews
        settings: {
            n,
            sessionStart,
            sessionEnd,
            direction,
            ended,
            started,
        },
        timePerCard: convertDateListToDeltaTime(timePerCard, reviewSettings.sessionStart!),  // @todo: convert dates to deltatime 
        passfail: passfail
    }), [params, location, reviewSettings, termsToReview, timePerCard, passfail])

    return newReviewSession;
}

export default useReviewSession;