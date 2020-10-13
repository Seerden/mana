import React, { memo, useState, useEffect } from "react";

const ListTerm = memo(({ handleTermDelete, term, idx }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [confirmingDelete, setConfirmingDelete ] = useState(false);
    const [isHovering, setIsHovering] = useState(false)

    const termStyles = {
        gridTemplateColumns: `2rem repeat(2, minmax(40%, min-content)) auto`,
    }
    const termDeleteStyles = {
        backgroundColor: confirmingDelete ? '' : null,
        border: confirmingDelete ? '2px solid orangered' : null
    }

    useEffect(() => {
        return () => {
            setIsEditing(false);
            setConfirmingDelete(false);
            setIsHovering(false)
        }
    }, [])

    const handleConfirmClick = (e, action) => {
        e.preventDefault();
        setConfirmingDelete(false);
        if (action.type === 'delete') {
            handleTermDelete(idx);
        }
    }

    return (
        <li 
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="List__term" style={ {...termStyles, ...termDeleteStyles} }>
            <div className="List__term-index">{idx+1}</div>
            <div className="List__term-from">{term.from}</div>
            <div className="List__term-to">{term.to}</div>
            
            { !isEditing && confirmingDelete &&
                <span className="List__term-remove-confirm">
                    <input 
                        onClick={(e) => handleConfirmClick(e, {type: 'delete'})}
                        className="remove-confirm-button remove-remove" type="button" value="delete"/>
                    <input 
                        onClick={e => handleConfirmClick(e, 'keep')}
                        className="remove-confirm-button remove-keep" type="button" value="keep"/>
                </span>
            }

            { !isEditing && isHovering && !confirmingDelete &&
                <input 
                    onClick={() => setConfirmingDelete(true)}
                    className="List__term-remove" 
                    type="button" 
                    value="x" 
                />
            }
        </li>
    )
})

export default ListTerm