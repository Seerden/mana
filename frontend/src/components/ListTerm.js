import React, { memo, useContext, useState, useEffect } from "react";
import Editable from '../wrappers/Editable';
import ListTermInput from './ListTermInput';
import { ListContext } from '../context/ListContext';
import { updateList} from '../helpers/db.api';

/**
 * ListTerm component
 * @param {object}  props: handleTermDelete (passed down function), term (list.content entry), idx (Number)
 */
const ListTerm = memo(({ handleTermDelete, term, idx }) => {
    const [_term, setTerm] = useState(() => ({ from: term.from, to: term.to }))
    const [isEditing, setIsEditing] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [isHovering, setIsHovering] = useState(false)
    const { listContextValue, setListContextValue } = useContext(ListContext);

    const termStyles = {
        gridTemplateColumns: !confirmingDelete 
            ? `2rem repeat(2, minmax(40%, min-content)) auto`
            : `2rem minmax(40%, min-content) repeat(2, auto)`,
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

    /**
     * Remove term from the list.
     * Triggered on deletion confirmation.
     * 
     * @todo        remove term from database entirely from this hook? or is there another 'send changes to database' layer on the /list/:id page?
     * @param {object} action    currently only expects {type: 'delete'}
     */
    const handleConfirmClick = (e, action) => {
        e.preventDefault();
        setConfirmingDelete(false);
        if (action.type === 'delete') {
            handleTermDelete(idx);
        }
    }

    /**
    * @param   {string}    field   'from'/'to', related to term.to and term.from properties (term is passed from props)
    * @todo update actual list itself, also update listContextValue, and then push new list state to db
    */
    const handleTermEdit = (e, field) => {
        if (e.target.value && _term[field] !== e.target.value) {
            let newTerm = { ..._term, [field]: e.target.value }
            setTerm(newTerm)
            let newListContent = [...listContextValue.content];
            newListContent[idx] = {...newTerm};
            let newList = {...listContextValue, content: [...newListContent]}
            setListContextValue(newList);
            updateList({_id: listContextValue._id, owner: listContextValue.owner}, newList)
                .then(r => console.log('List updated in database', r))
        }
    }

    return (
        <li
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="List__term"
            style={{ ...termStyles, ...termDeleteStyles }}
        >
            <div className="List__term-index">{idx + 1}</div>

            <Editable
                initialState={<div title="Click to edit" className="List__term-from">{_term.from}</div>}
                editState={<ListTermInput _term={_term} handleTermEdit={handleTermEdit} side="from" />}
            />

            <Editable
                initialState={<div title="Click to edit" className="List__term-to">{_term.to}</div>}
                editState={<ListTermInput _term={_term} handleTermEdit={handleTermEdit} side="to" />}

            />

            { !isEditing && confirmingDelete &&
                <span className="List__term-remove-confirm">
                    <input
                        title="Permanently delete term"
                        onClick={(e) => handleConfirmClick(e, { type: 'delete' })}
                        className="remove-confirm-button remove-remove" type="button" value="delete" />
                    <input
                        title="Keep term"
                        onClick={e => handleConfirmClick(e, 'keep')}
                        className="remove-confirm-button remove-keep" type="button" value="keep" />
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