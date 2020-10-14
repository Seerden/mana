import React, { memo, useState, useEffect } from "react";
import { useLogState } from '../hooks/state';

const ListTerm = memo(({ handleTermDelete, term, idx }) => {
    const [_term, setTerm] = useState(() => ({from: term.from, to: term.to}))
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingFrom, setIsEditingFrom] = useState(false);
    const [isEditingTo, setIsEditingTo] = useState(false);
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

    const handleTermEdit = (e, field) => {
        setTerm({..._term, [field]: e.target.value})        
    }

    return (
        <li 
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="List__term" style={ {...termStyles, ...termDeleteStyles} }>
            <div className="List__term-index">{idx+1}</div>
            { !isEditingFrom &&
               <div 
                 onClick={() => setIsEditingFrom(true)}
                 className="List__term-from">{_term.from}</div>
            }
            { isEditingFrom &&
                
                <div className="List__term-input-wrapper">
                    <input
                      autoFocus
                      autoCorrect="false"
                      className="List__term-input"
                      onChange={(e) => handleTermEdit(e, 'from')}
                      onBlur={() => {
                        setIsEditingFrom(false)
                        setIsEditing(false)
                      }}
                    type="text" name="" id="" defaultValue={_term.from}/>
                </div>
            }
            
            { !isEditingTo &&
                <div className="List__term-to">{_term.to}</div>
            }
            
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

/* 
@todo:  add edit functionality to 'to' field,
        after writing a TermEdit component that has both the input field and the editing state

        put a wrapper around the term/edit to assure dimensions match
*/