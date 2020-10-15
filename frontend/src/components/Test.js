// import React, { useState } from "react";

// const Test = (props) => {
//     const [file, setFile] = useState(null);
//     const handleFileWrite = async () => {
//         const [fileToHandle] = await window.showOpenFilePicker();
//         const f = await fileToHandle.getFile();
//         setFile(await f.text())


//     }

//     return (
//         <div className="Test">
//             <input onClick={handleFileWrite}type="button" value="Open file"/>


//         { file && 
//             <div>{JSON.stringify(file)}</div>
//         }
//         </div>
//     )
// }

// export default Test


/*  */

import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useRouteProps } from '../hooks/routerHooks';

const Test = (props) => {
    let { params } = useRouteProps();

    useEffect(() => {
        console.log(params);
    }, [])

    return (
        <div className="Test">
            Test.js
            <Routes>
                <Route path="/id/:name">
                    <SubTest />
                </Route>
            </Routes>
        </div>
    )
}

const SubTest = () => {
    const { params, location } = useRouteProps();
    useEffect(() => {
        console.log(params);
    }, [])

    return (
        <div className="">
            SubTest.js
        </div>
    )
}

export default Test