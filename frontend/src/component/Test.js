import React, { useState } from "react";

import { useLogState } from '../hooks/state';

const Test = (props) => {
    const [testState, setTestState] = useState(() => 0)
    
    useLogState('testState', testState, setTestState);

    return (
        <div className="Test">
            <input type="button" value="Increment" onClick={() => setTestState(testState+1)}/>
        </div>
    )
}

export default Test