import React, { memo, useContext, useState, useEffect } from "react";
import { ListContext } from '../../context/ListContext';

import TermModal from './TermModal';
import SaturationIcon from './SaturationIcon';

import { useRequest } from '../../hooks/useRequest';
import { putList, handlePutList } from '../../helpers/apiHandlers'

import './style/ListTerm.scss'

/**
 * ListTerm component
 * @param {object}  props: handleTermDelete (passed down function), term (list.content entry), idx (Number)
 */
const ListTerm = memo(({ handleTermDelete, term: termFromProps, idx }) => {
    const [term, setTerm] = useState(() => (termFromProps)),
        [confirmingDelete, setConfirmingDelete] = useState(false),
        { listContextValue, setListContextValue } = useContext(ListContext),
        { setRequest: setPutRequest } = useRequest({...handlePutList()}),
        [open, setOpen] = useState(false);

    useEffect(() => { // cleanup
        return () => {
            setConfirmingDelete(false);
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
        setOpen(false);
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
        if (e.target.value && term[side] !== e.target.value) {
            let newTerm = { ...term, [side]: e.target.value }
            setTerm(newTerm)
            let newListContent = [...listContextValue.content];
            newListContent[idx] = { ...newTerm };
            let newList = { ...listContextValue, content: [...newListContent] }
            setListContextValue(newList);
            setPutRequest(() => putList(listContextValue.owner, { _id: listContextValue._id, owner: listContextValue.owner }, newList))
        }
    }

    return (
        <div className="ListTerm">
            <li className="Term" title="Click to expand" onClick={() => setOpen(true)}>
                    <span className="Term__index">{idx+1}</span>
                    <span className="Term__from">{term.from}</span>
                    <span className="Term__to">{term.to}</span>
                    <SaturationIcon classes={"Term__saturation"} direction="forwards" saturation={term.saturation?.forwards}/>
                    <SaturationIcon classes={"Term__saturation"} direction="backwards" saturation={term.saturation?.backwards}/>
                </li>
            { open && 
                <TermModal 
                    handleConfirmClick={handleConfirmClick}
                    setOpen={setOpen} 
                    term={term} 
                    handleTermEdit={handleTermEdit} 
                    confirmingDelete={confirmingDelete}
                    setConfirmingDelete={setConfirmingDelete}
                />
            }
        </div>
    )
})

export default ListTerm

/* FIXME: deleting only term in a list doesn't update visible terms (but does update the database entry, so problem lies in a key or a render based on .length > 0) */