import React from "react";
import dayjs from 'dayjs';
import './css/ListSession.css'

const ListSessions = ({ sessions }) => {

    return (
        <div className="Sessions">
            { sessions && sessions.length > 0 &&
                <>
                    <div className="Sessions__title">
                        Sessions
                    </div>
                    <div className="Sessions__sessions">
                        <div className="Sessions__header">
                            <span>Start</span>
                            <span>End</span>
                            <span># Terms</span>
                        </div>
                        {sessions && sessions.reverse().map(s => <Session session={s} />)}
                    </div>
                </>
            }
        </div>
    )
}

const Session = ({ session }) => {
    const { start, end, numTerms } = session;
    const formatDate = (date) => dayjs(date).format('YYYY-MM-DD HH:mm')

    return (
        <div className="Session__Wrapper">

            <div className="Session">
                <div className="Session__start">
                    {formatDate(start)}
                </div>
                <div className="Session__end">
                    {formatDate(end)}
                </div>
                <div className="Session__numTerms">
                    {numTerms}
                </div>
            </div>
        </div>
    )
}

export default ListSessions