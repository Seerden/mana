import React from "react";
import { useRouteProps } from "hooks/routerHooks";
import { useQueryReviewSessionsByUser } from "graphql/hooks/reviewSession.query";
import SessionCard from "./SessionCard";
import './style/UserSessions.scss';

const UserSessions = (props) => {
    const { params } = useRouteProps();
    const [{ data: sessions }] = useQueryReviewSessionsByUser();

    return (
        <div className="UserSessions">
            <header className="UserSessions__header">
                {params.username}'s review sessions
            </header>

            {sessions && sessions.map((session, idx) => <SessionCard key={`session-card-${idx}`} session={session} />).reverse()}
        </div>

    )
}

export default UserSessions