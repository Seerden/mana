import React from "react";
import { Link } from "react-router-dom";

import { useRouteProps } from "../../hooks/routerHooks";

const Sets = (props) => {
    const { params } = useRouteProps();    

    return (
        <div className="PageWrapper">
            <div className="Sets">
                <header className="PageHeader">
                    Sets by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link>
                    
                </header>
            </div>
        </div>
    )
}

export default Sets