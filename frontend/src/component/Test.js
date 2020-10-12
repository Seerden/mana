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

import React, { useState, useEffect } from "react";
import { useLogState } from "../hooks/state";

const Test = (props) => {
    const [state, setState] = useState(() => ({date: Date.now(), content: [1,2,3]}))

    useLogState('state', state)

    useEffect(() => {
        let content = state.content;
        content.push(11,12,13)
        setState({...state, content: [...content]})
    }, [])
    
    return (
        <div className="Test">
            
        </div>
    )
}

export default Test