import React, { memo } from 'react';

import './css/form.css';

import './css/NewList.css'

const NewListTerm = memo(({ index, formOutput, setFormOutput }) => {
    const handleTermBlur = (e, idx) => {
        e.preventDefault();
        idx -= 1

        let copy = { ...formOutput }
        // check if term exists
        if (!copy.content[idx] && e.target.value) {
            copy.content[idx] = { to: "", from: "" };
        }
        if (e.target.value && e.target.value !== copy.content[idx][e.target.name]) {
            copy.content[idx][e.target.name] = e.target.value
            setFormOutput({ ...formOutput, content: copy.content })
        }
    }

    return (
        <div className="Term-fromto">
            <input onBlur={(e) => handleTermBlur(e, index)} type="text" name="from" />
            <input onBlur={(e) => handleTermBlur(e, index)} type="text" name="to" />
        </div>
    )
})

export default NewListTerm;

/*
Future:
- might need multiple 'to' fields, which should be indicated by user through UI.

*/