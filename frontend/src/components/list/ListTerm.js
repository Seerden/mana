import React, { memo, useContext, useState, useEffect } from "react";
import Editable from '../../wrappers/Editable';
import ListTermInput from './ListTermInput';
import { ListContext } from '../../context/ListContext';
import { updateList } from '../../helpers/db.api';
import ListTermDeleteButton from "./ListTermDeleteButton";

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
        gridTemplateColumns: confirmingDelete
            ? `2rem repeat(2, minmax(40%, min-content)) auto`
            : `2rem repeat(2, minmax(40%, min-content)) auto`,
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
            newListContent[idx] = { ...newTerm };
            let newList = { ...listContextValue, content: [...newListContent] }
            setListContextValue(newList);
            updateList({ _id: listContextValue._id, owner: listContextValue.owner }, newList)
                .then(r => console.log('List updated in database', r))
        }
    }

    return (
        <>
            <li
                className="List__term"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{ ...termStyles }}
            >
                <div className="List__term-index">{idx + 1}</div>

                <Editable
                    initialState={<div title="Click to edit" className="List__term--from">{_term.from}</div>}
                    editState={<ListTermInput _term={_term} handleTermEdit={handleTermEdit} side="from" />}
                />

                <Editable
                    initialState={<div title="Click to edit" className="List__term--to">{_term.to}</div>}
                    editState={<ListTermInput _term={_term} handleTermEdit={handleTermEdit} side="to" />}

                />

                {!isEditing &&
                    <ListTermDeleteButton
                        confirmingDelete={confirmingDelete}
                        isHovering={isHovering}
                        setConfirmingDelete={setConfirmingDelete}
                        handleConfirmClick={handleConfirmClick}
                    />
                }

            </li>
        </>
    )
})

export default ListTerm

/*
@todo:  add edit functionality to 'to' field,
        after writing a TermEdit component that has both the input field and the editing state

        put a wrapper around the term/edit to assure dimensions match
*/

/* @todo fix widescreen grid (too much empty space between terms and sessions) */