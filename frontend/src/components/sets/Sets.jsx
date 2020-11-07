import React from "react";
import { Link } from "react-router-dom";
import { useRouteProps } from "../../hooks/routerHooks";
import NewSet from './NewSet';

const Sets = (props) => {
    const { params } = useRouteProps();    

    return (
        <div className="PageWrapper">
            <div className="Sets">
                <header className="PageHeader">
                    Sets by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link>
                </header>

                <section>
                    <NewSet />
                </section>
            </div>
        </div>
    )
}

export default Sets