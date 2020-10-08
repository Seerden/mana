import React, { useEffect, useState } from "react";

import { useLogState } from '../hooks/state';
import { useRouteProps } from '../hooks/routerHooks';

const Test = (props) => {
    const [testState, setTestState] = useState(() => 0)
    const [routeProps, setRouteProps] = useState(useRouteProps())

    useLogState('route props', routeProps)
    useLogState('testState', testState, setTestState);

    return (
        <div className="Test">
            <input type="button" value="Increment" onClick={() => setTestState(testState+1)}/>
        </div>
    )
}

export default Test