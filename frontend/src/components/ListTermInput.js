import React, { memo } from "react";

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