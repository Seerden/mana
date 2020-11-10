import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { handleError, handleResponse } from "../../helpers/apiHandlers/apiHandlers";
import { getSets } from "../../helpers/apiHandlers/setHandlers";
import { useRouteProps } from "../../hooks/routerHooks";
import { useRequest } from "../../hooks/useRequest";
import './style/Sets.scss'

const Sets = (props) => {
    const { params } = useRouteProps(),
        { response, setRequest } = useRequest({ handleResponse, handleError }),
        sets = useMemo(() => response, [response]);

    useEffect(() => {
        setRequest(() => getSets(params.username, { owner: params.username }))
    }, [])

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
                    {sets && JSON.stringify(sets)}
                </section>
            </div>
        </div>
    )
}

export default Sets