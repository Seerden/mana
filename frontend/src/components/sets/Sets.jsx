import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { handleError, handleResponse } from "helpers/apiHandlers/apiHandlers";
import { getSets } from "helpers/apiHandlers/setHandlers";
import { useRouteProps } from "hooks/routerHooks";
import { useRequest } from "hooks/useRequest";
import SetCard from './SetCard';
import './style/Sets.scss'
import { useLogState } from "hooks/state";

const Sets = (props) => {
    const { params } = useRouteProps(),
        { response, setRequest } = useRequest({ handleResponse, handleError }),
        sets = useMemo(() => response, [response]);

    useEffect(() => {  // retrieve the user's sets on component load
        setRequest(() => getSets(params.username, { owner: params.username }))
    }, [])

    useLogState('sets', sets)

    return (
        <div className="PageWrapper">
            <div className="Sets">
                <header className="PageHeader">
                    Sets by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link>
                </header>

                <section className="Banner__link">
                    <Link className="Sets__link" to="new">New Set</Link>
                </section>

                <section>
                    {sets?.map(set => <SetCard key={set._id} set={set} />)}
                </section>
            </div>
        </div>
    )
}

export default Sets