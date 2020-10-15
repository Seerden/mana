/**
     * @param   {string}   props.side    'from'/'to'
     */
    
import React from "react";

const ListTermInput = ({ _term, handleTermEdit, side }) => {
    
    return (
        <input
            autoFocus
            autoCorrect="false"
            className="List__term-input"
            onBlur={(e) => handleTermEdit(e, side)}
            type="text" name="" id="" defaultValue={_term[side]} 
        />
    )
}

export default ListTermInput