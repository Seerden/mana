import React from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from '../../hooks/routerHooks';
import dayjs from 'dayjs';

const PostReview = ({ sessionStart, sessionEnd, list }) => {
    const { navigate, params } = useRouteProps();
    const formatDate = (date) => dayjs(date).format('HH:mm:ss');

    return (
        <div className="Review__post">
            <h2>Session completed.</h2>
            <div>Started at {formatDate(sessionStart)}</div>
            <div>Completed at {formatDate(sessionEnd)}</div>

            <button className="Button">
                <Link to={`/u/${list.owner}/list/${params.id}`}>Back to list</Link>
            </button>

            <button className="Button">
                <Link to={`/u/${list.owner}/lists`}>My lists</Link>
            </button>

            <button onClick={() => navigate(0)}className="Button">
                <Link to={`/u/${list.owner}/list/${params.id}/review`}>Review again</Link>
            </button>
        </div>
    )
}

export default PostReview