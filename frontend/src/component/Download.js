import React, { useEffect } from "react";
import axios from 'axios';

const Download = (props) => {

    const handleDownload = e => {
        e.preventDefault();
        axios.get('/test/download', { responseType: 'blob' }).then(r => {
            const url = window.URL.createObjectURL(new Blob([r.data]));
            console.log(url)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.json'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }

    return (
        <div className="Download">
            <input onClick={handleDownload} type="button" value="Download"/>

            <a href="http://localhost:5000/test/download">Download directly from backend link</a>
        </div>
    )
}

export default Download

/* 
- Downloading a file from backend (in express, it's sent through res.download)
    above solution thanks to https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
- Alternative would be to create the file in the frontend
- Other alternative (see above) is to just link to the backend download endpoint. requires knowing the backend proxy address and getting it somehow. figure out how to do this (also when deployed)

*/