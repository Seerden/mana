import React from "react";
import { useRouteProps } from '../hooks/routerHooks';
import { useLogState } from '../hooks/state';

const Sets = (props) => {
    const { match } = useRouteProps();
    const username = match.params.username;
    return (
        <div className="Sets">
            Sets.js
        </div>
    )
}

export default Sets