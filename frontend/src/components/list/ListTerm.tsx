import React, { memo, useState, useMemo, useEffect } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { useRequest } from 'hooks/useRequest';
import { putTerm } from 'helpers/apiHandlers/listHandlers'
import { selectingTermsToReviewState, listState } from 'recoil/atoms/listAtoms';
import { termsToReviewState } from "recoil/atoms/reviewAtoms";
import TermModal from './TermModal';
import SaturationIcon from 'components/SaturationFilter/SaturationIcon';
import './style/ListTerm.scss'
import { handleError, handleResponse } from "helpers/apiHandlers/apiHandlers";
import { TermPropsInterface } from './list.types';

const ListTerm = memo(({ handleTermDelete, term: termFromProps, idx }: TermPropsInterface) => {
    const [term, setTerm] = useState<any>(() => (termFromProps)),  // @todo: fix any type to be combination of TermInterface and TermElementInterface, after figuring out why I'm using two Term(*?)Interface types
        [confirmingDelete, setConfirmingDelete] = useState(false),
        { setRequest: setPutTermRequest } = useRequest({handleResponse, handleError}),
        [open, setOpen] = useState<boolean>(false);

    // ----- REFACTOR
    const [listAtom, setListAtom] = useRecoilState(listState)
    const selectingTerms = useRecoilValue(selectingTermsToReviewState);
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    let indexOfTermInTermsToReview = termsToReview.findIndex(t => t._id === term._id);
    const [selected, setSelected] = useState(indexOfTermInTermsToReview > -1);

    useEffect(() => {  // might be superfluous
        indexOfTermInTermsToReview = termsToReview.findIndex(t => t._id === term._id)
        setSelected(indexOfTermInTermsToReview > -1)
    }, [termsToReview])


    useEffect(() => {  // cleanup
        return () => { setConfirmingDelete(false); }
    }, [])

    function handleSelect(e) {
        e.stopPropagation();
        
        if (indexOfTermInTermsToReview > -1) {
            let currentTermsToReview = [...termsToReview];
            currentTermsToReview.splice(indexOfTermInTermsToReview, 1);
            setTermsToReview(currentTermsToReview)
            setSelected(false);
        } else {
            setTermsToReview(current => ([...current, term]))
            setSelected(true)
        }
    }

    /**
     * Remove term from the list.
     * Triggered on deletion confirmation.
     * @param {object} action    currently only expects {type: 'delete'}
     */
    function handleConfirmClick(e: React.SyntheticEvent, action: {type: string}) {
            e.preventDefault();
            setConfirmingDelete(false);
            setOpen(false);
            if (action.type === 'delete') {
                handleTermDelete(idx);
            }
        }

    /**
    * @todo update actual list itself, also update listContextValue, and then push new list state to db
    */
    function handleTermEdit(e) {
        let side = e.currentTarget.getAttribute('side');
        if (e.target.value && term[side] !== e.target.value) {
            let newTerm = { ...term, [side]: e.target.value };
            setTerm(newTerm);
            setPutTermRequest(() => putTerm(listAtom.owner, { _id: term._id }, newTerm))

            let newListContent: any[] = [...listAtom.terms];
            newListContent[idx] = { ...newTerm };
            let newList = { ...listAtom, terms: [...newListContent] };
            setListAtom(newList);
            
            // setPutRequest(() => putList(listAtom.owner, { _id: listAtom._id, owner: listAtom.owner }, newList));
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
                    {selectingTerms 
                        ? 
                            <div 
                                className="Term__select"
                                style={{
                                    color: selected ? 'seagreen' : '#555',
                                }}
                                onClick={handleSelect}
                            >
                                {selected 
                                    ? <ImCheckboxChecked/>
                                    : <ImCheckboxUnchecked/>
                                }
                            </div>
                        : '' 
                    }
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