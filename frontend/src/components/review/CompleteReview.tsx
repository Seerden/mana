import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useRouteProps } from "hooks/routerHooks";
import { useRequest } from "hooks/useRequest";
import { getList, putList } from "helpers/apiHandlers/listHandlers";
import { termsToReviewState, reviewStageState, reviewSettingsState } from 'recoil/atoms/reviewAtoms';
import { maybeUpdateListStateAfterReview } from 'helpers/list.api'

/**
 * Wrapper for full-list or full-set reviews.
 */
const CompleteReview = ({ children }) => {
    const { params, location } = useRouteProps();
    const { response: listOrSetResponse, setRequest: getListOrSetRequest } = useRequest({});
    const { setRequest: putListRequest } = useRequest({});
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const reviewStage = useRecoilValue(reviewStageState);
    const reviewSettings = useRecoilValue(reviewSettingsState);

    // on component mount, get list from database  @todo: implement full-set review functionality
    useEffect(() => {
        resetTermsToReview();
        if (location.pathname.includes('list')) {
            getListOrSetRequest(() => getList(params.username, { _id: params.id }));
        } else if (location.pathname.includes('set')) {
            // @todo: handle getting all terms in the set
        }
    }, [])

    // once list is received from backend, set termsToReview to all terms from the list  
    // @todo: implement set functionality
    useEffect(() => {
        if (listOrSetResponse && !(termsToReview.length > 0)) {
            setTermsToReview(listOrSetResponse.terms);
        }
    }, [listOrSetResponse])

    // on completion of full list review, push current session to list.sessions,
    // update list.lastReviewed, and maybe update list.state
    useEffect(() => {
        if (reviewStage === 'after') {
            if (listOrSetResponse && location.pathname.includes('list')) {
                let list = listOrSetResponse;

                putListRequest(() => putList(params.username, {_id: list._id }, 
                    {
                        lastReviewed: reviewSettings.sessionEnd,
                        state: maybeUpdateListStateAfterReview(list, reviewSettings.direction)
                    }
                ));
            }
        }
    }, [reviewStage, listOrSetResponse])

    return (
        <>
            { termsToReview.length > 0 || reviewStage !== 'before' ? <>{children}</> : <>Loading...</>}
        </>
    )
}

export default CompleteReview