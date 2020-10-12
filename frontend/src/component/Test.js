import React, { useState } from "react";

const Test = (props) => {
    const [file, setFile] = useState(null);
    const handleFileWrite = async () => {
        const [fileToHandle] = await window.showOpenFilePicker();
        const f = await fileToHandle.getFile();
        setFile(await f.text())
    

    }

    return (
        <div className="Test">
            <input onClick={handleFileWrite}type="button" value="Open file"/>
        

        { file && 
            <div>{JSON.stringify(file)}</div>
        }
        </div>
    )
}

export default Test