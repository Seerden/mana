import React, { memo } from "react";

/**
 * List term input element
 * @return {jsx} input:text element to edit and update a list term
 */
const ListTermInput = memo(({ _term, handleTermEdit, side }) => {
    
    return (
        <input
            autoFocus
            autoCorrect="false"
            className="List__term-input"
            onBlur={(e) => handleTermEdit(e, side)}
            type="text" name="" id="" defaultValue={_term[side]} 
        />
    )
})

export default ListTermInput