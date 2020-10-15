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

import React from "react";
import Editable from '../wrappers/Editable';

const Test = (props) => {

    return (
        <Editable
            initialState={
                <div>
                    <div onClick={() => console.log('clicked')} className="class-initial">Initial</div>
                </div>
            }
            editState={
                <div>
                    <input autoFocus type="text" />
                </div>
            }
        />
    )
}

export default Test