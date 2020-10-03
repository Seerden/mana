import React from 'react';

import './css/form.css';

import './css/NewList.component.css'

const NewList__Term = ({ index }) => {
    return (
        <div className="NewList__Terms-fromto">
            <input type="text" name="Term__From"/>
            <input type="text" name="Term__To"/>
        </div>
    )
}

export default NewList__Term;

/* 
Future:
- might need multiple 'to' fields, which should be indicated by user through UI.

*/