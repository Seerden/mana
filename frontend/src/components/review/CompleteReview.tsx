import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useRouteProps } from "hooks/routerHooks";
import { termsToReviewState, reviewStageState, reviewSettingsState } from 'recoil/atoms/reviewAtoms';
import { maybeUpdateListStateAfterReview } from 'helpers/list.api'
import { useQueryListsById } from "graphql/queries/list.query";

// @todo: replace all REST calls with GraphQl queries and mutations

/**
 * Wrapper for full-list or full-set reviews.
 */
const CompleteReview = ({ children }) => {
    const { params, location } = useRouteProps();
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const reviewStage = useRecoilValue(reviewStageState);
    const reviewSettings = useRecoilValue(reviewSettingsState);
    const  { data: lists, refetch: refetchLists } = useQueryListsById([params.id])

    // on component mount, get list from database  @todo: implement full-set review functionality
    useEffect(() => {
        resetTermsToReview();
        if (location.pathname.includes('list')) {
            refetchLists()
        } 
    }, [])

    useEffect(() => {
        lists && console.log(lists)
        console.log(termsToReview);
    }, [lists])

    // once list is received from backend, set termsToReview to all terms from the list  
    useEffect(() => {
        if (lists) {
            // @ts-ignore - the query returns TermsUnion, but the list should definitely be populated - @todo: look into this
            setTermsToReview(lists[0].terms);
        }
    }, [lists])

    // on completion of full list review, push current session to list.sessions,
    // update list.lastReviewed, and maybe update list.state
    // useEffect(() => {
    //     if (reviewStage === 'after') {
    //         if (listOrSetResponse && location.pathname.includes('list')) {
    //             let list = listOrSetResponse;

    //             putListRequest(() => putList(params.username, {_id: list._id }, 
    //                 {
    //                     lastReviewed: reviewSettings.sessionEnd,
    //                     state: maybeUpdateListStateAfterReview(list, reviewSettings.direction)
    //                 }
    //             ));
    //         }
    //     }
    // }, [reviewStage, listOrSetResponse])

    return (
        <>
            { termsToReview.length > 0 || reviewStage !== 'before' ? <>{children}</> : <>Loading...</>}
        </>
    )
}

export default CompleteReview