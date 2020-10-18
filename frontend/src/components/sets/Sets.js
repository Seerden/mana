import React from "react";
import { useRouteProps } from '../../hooks/routerHooks';
import { useLogState } from "../../hooks/state";
import './css/Sets.css';

const Sets = (props) => {
    const { params } = useRouteProps();
    useLogState('params', params);

    return (
        <div className="Sets PageComponent">
            <div className="Sets__header PageHeader">Sets overview</div>
        </div>
    )
}

export default Sets