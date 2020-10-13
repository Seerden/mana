import React, { useState } from "react";

const ListTerm = ({ term, idx }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDelete, setConfirmDelete ] = useState(false);
    const [isHovering, setHovering] = useState(false)

    const termStyles = {
        gridTemplateColumns: `2rem repeat(2, minmax(40%, min-content)) auto`,
        // gridTemplateRows: `3fr ${confirmDelete ? '' : ''}`
    }
    const termDeleteStyles = {
        backgroundColor: confirmDelete ? '' : null,
        border: confirmDelete ? '2px solid orangered' : null
    }

    return (
        <li 
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="List__term" style={ {...termStyles, ...termDeleteStyles} }>
            <div className="List__term-index">{idx}</div>
            <div className="List__term-from">{term.from}</div>
            <div className="List__term-to">{term.to}</div>
            
            { !isEditing && confirmDelete &&
                <span className="List__term-remove-confirm">
                    <input 
                        onClick={() => setConfirmDelete(false)}
                        className="remove-confirm-button remove-remove" type="button" value="delete"/>
                    <input 
                        onClick={() => setConfirmDelete(false)}
                        className="remove-confirm-button remove-keep" type="button" value="keep"/>
                </span>

            }
            {!isEditing && isHovering && !confirmDelete &&
                <input 
                    onClick={() => setConfirmDelete(true)}
                    className="List__term-remove" 
                    type="button" 
                    value="x" />
            }

            
        </li>
    )
}

export default ListTerm