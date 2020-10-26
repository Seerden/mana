import React, { memo, useContext, useState, useEffect } from "react";
import { ListContext } from '../../context/ListContext';
import { updateList } from '../../helpers/db.api';
import ListTermDeleteButton from "./ListTermDeleteButton";
import TermHistory from './TermHistory';
import { v4 as uuidv4 } from 'uuid';

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
    const [showHistory, setShowHistory] = useState(false);

    const termStyles = {
        border: confirmingDelete ? '2px solid orangered' : "2px solid transparent",
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
    const handleTermEdit = (e) => {
        let side = e.currentTarget.getAttribute('side');
        if (e.target.value && _term[side] !== e.target.value) {
            let newTerm = { ..._term, [side]: e.target.value }
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
            >
                <div className="term">

                    {/* <div style={{ color: confirmingDelete ? 'orangered' : '' }} className="term--index">{idx + 1}</div> */}
                    {!isEditing && isHovering ?
                        <>
                            <ListTermDeleteButton
                                confirmingDelete={confirmingDelete}
                                isHovering={isHovering}
                                setConfirmingDelete={setConfirmingDelete}
                                handleConfirmClick={handleConfirmClick}
                            />
                        </> 
                        : <div style={{ color: confirmingDelete ? 'orangered' : '' }} className="term--index">{idx + 1}</div>
                    }

                    <input 
                        disabled={confirmingDelete}
                        style={{
                            backgroundColor: confirmingDelete ? 'orangered' : '',
                        }}
                        onBlur={handleTermEdit} className="term--side term--from" side="from" type="text" defaultValue={_term.from} />
                    <input 
                        disabled={confirmingDelete}
                        style={{
                            backgroundColor: confirmingDelete ? 'orangered' : '',
                        }}
                        onBlur={handleTermEdit} className="term--side term--to" side="to" type="text" defaultValue={_term.to} />

                    { (showHistory || (isHovering && !confirmingDelete)) && <button className="List__term--historybutton" onClick={() => setShowHistory(!showHistory)}>hist</button> }
                </div>




            </li>

            <TermHistory visible={showHistory} history={term.history} />
        </>
    )
})

export default ListTerm

/* FIXME: deleting only term in a list doesn't update visible terms (but does update the database entry, so problem lies in a key or a render based on .length > 0) */