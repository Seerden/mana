import React, { memo } from 'react';
import './style/NewList.scss'

const NewListTerm = memo(({ index, formOutput, setFormOutput }) => {
    function handleTermBlur(e, idx) {
        let copy = { ...formOutput };
        if (!copy.terms[idx] && e.target.value) {
            copy.terms[idx] = { to: "", from: "" };
        }
        if (e.target.value && e.target.value !== copy.terms[idx][e.target.name]) {
            copy.terms[idx][e.target.name] = e.target.value;
            setFormOutput({ ...formOutput, terms: copy.terms });
        }
    }

    return (
        <div className="NewList__term">
            <div className="NewList__term--index">{index+1}</div>
            <input className="NewList__term--input" onBlur={(e) => handleTermBlur(e, index)} type="text" name="from" />
            <input className="NewList__term--input" onBlur={(e) => handleTermBlur(e, index)} type="text" name="to" />
        </div>
    )
})

export default NewListTerm;