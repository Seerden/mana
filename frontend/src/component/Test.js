import React from "react";
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';

const Test = ( props ) => {
    let history = useHistory();
    let match = useRouteMatch();
    const location = useLocation();

    return (
        <div className="Test">
            {/* {JSON.stringify(match)} */}
            {/* { JSON.stringify(history) } */}
            { JSON.stringify(location) }
        </div>
    )
}

export default Test