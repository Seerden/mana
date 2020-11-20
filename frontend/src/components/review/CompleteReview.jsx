import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouteProps } from "hooks/routerHooks";
import { useRequest } from "hooks/useRequest";
import { getList, putList } from "helpers/apiHandlers/listHandlers";
import { termsToReviewState, reviewStageState, reviewSettingsState } from 'recoil/atoms/reviewAtoms';
import { numTermsToReviewState } from "recoil/selectors/reviewSelectors";
import { maybeUpdateListStateAfterReview } from "helpers/list.api";

/**
 * Wrapper for full-list or full-set reviews.
 */
const CompleteReview = ({ children }) => {
    const { params, location } = useRouteProps();
    const { response: listOrSetResponse, setRequest: getListOrSetRequest } = useRequest({});
    const { response: putListResponse, setRequest: putListRequest } = useRequest({});
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    const reviewStage = useRecoilValue(reviewStageState);
    const reviewSettings = useRecoilValue(reviewSettingsState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);

    useEffect(() => {
        if (location.pathname.includes('list')) {
            getListOrSetRequest(() => getList(params.username, { _id: params.id }));
        } else if (location.pathname.includes('set')) {
            // handle getting all terms in the set
        }
    }, [])

    useEffect(() => {
        if (listOrSetResponse && !termsToReview?.length > 0) {
            setTermsToReview(listOrSetResponse.terms);
        }
    }, [listOrSetResponse])

    useEffect(() => {
        if (reviewStage === 'after') {
            const session = {
                start: reviewSettings.sessionStart,
                end: reviewSettings.sessionEnd,
                termsReviewed: numTermsToReview*reviewSettings.n,
                numTerms: numTermsToReview,
                n: reviewSettings.n,
                direction: reviewSettings.direction,
            }

            if (listOrSetResponse && location.pathname.includes('list')) {
                let list = listOrSetResponse;
                putListRequest(() => putList(params.username, {_id: list._id }, 
                    {
                        ...list, 
                        terms: list.terms.map(t => t._id),
                        sessions: [...list.sessions, session],
                        lastReviewed: session.end,
                        state: maybeUpdateListStateAfterReview(list, reviewSettings.direction)
                    }));
            }
        }
    }, [reviewStage, listOrSetResponse])

    return (
        <>
            { termsToReview?.length > 0 || reviewStage !== 'before' ? <>{children}</> : <>Loading...</>}
        </>
    )
}

export default CompleteReview