import React, { useEffect } from "react";
import { useRouteProps } from "hooks/routerHooks";
import { useQueryReviewSessionsByUser } from "graphql/queries/reviewSession.query";
import SessionCard from "./SessionCard";
import './style/UserSessions.scss'

const UserSessions = (props) => {
    const { params } = useRouteProps();

    const [{ refetch: refetchSessions, data: sessions, isError }, setOwner] = useQueryReviewSessionsByUser();

    useEffect(() => {
        refetchSessions()
    }, [])

    return (
        <div className="UserSessions">
            <header className="UserSessions__header">
                {params.username}'s review sessions
            </header>

            {sessions && sessions.map((session, idx) => <SessionCard key={`session-card-${idx}`} session={session} />)}

        </div>

    )
}

export default UserSessions