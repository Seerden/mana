import React, { useEffect } from "react";
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { useRouteProps } from '../../hooks/routerHooks';
import { timePerCardState, reviewSettingsState, termsToReviewState } from 'recoil/atoms/reviewAtoms';

import dayjs from 'dayjs';

const PostReview = () => {
    const { navigate, params } = useRouteProps();
    const formatDate = (date) => dayjs(date).format('HH:mm:ss');
    const { sessionStart, sessionEnd } = useRecoilValue(reviewSettingsState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const timePerCard = useRecoilValue(timePerCardState);
    const resetTimePerCard = useResetRecoilState(timePerCardState)

    useEffect(() => {
        return () => {
            resetTermsToReview();
            resetTimePerCard();
        }
    }, [])

    return (
        <div className="Review__post">
            <h2>Session completed.</h2>
            <div>Started at {formatDate(sessionStart)}</div>
            <div>Completed at {formatDate(sessionEnd)}</div>
            <div>Time per card: {JSON.stringify(timePerCard)}</div>

            <button className="Button">
                <Link to={`/u/${params.username}/list/${params.id}`}>Back to list</Link>
            </button>

            <button className="Button">
                <Link to={`/u/${params.username}/lists`}>Back to lists overview</Link>
            </button>

            <button 
                onClick={() => navigate(0)}
                className="Button"
            >
                <Link to={`/u/${params.username}/list/${params.id}/review`}>Review this list again</Link>
            </button>
        </div>
    )
}

export default PostReview