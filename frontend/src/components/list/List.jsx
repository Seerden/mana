import React, { memo, useMemo, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { formatDate, timeSince } from 'helpers/time';
import { getList, putList, deleteList, deleteTerm } from 'helpers/apiHandlers/listHandlers';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import { selectingTermsToReviewState, listState } from 'recoil/atoms/listAtoms';

import ListTerm from './ListTerm';
import SetPicker from './SetPicker';
import SaturationFilter from 'components/SaturationFilter/SaturationFilter';
import PageInfo from 'components/_shared/PageInfo';
import ListDeleteButton from './ListDeleteButton';

import './style/List.scss';
import { termsToReviewState } from "recoil/atoms/reviewAtoms";
import ListSaturationState from "./ListSaturationState";
import { useLogState } from "hooks/state";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const List = memo((props) => {
    const [list, setList] = useState(null),
        [filter, setFilter] = useState({ saturation: { level: null, direction: 'any' } }),
        [terms, setTerms] = useState(null),
        { params, location } = useRouteProps(),
        { response: getResponse, setRequest: setGetRequest } = useRequest({}),
        { setRequest: setPutRequest } = useRequest({}),
        { setRequest: setPutListTitleRequest } = useRequest({}),
        { response: deleteResponse, setRequest: setDeleteRequest } = useRequest({}),
        { setRequest: setTermDeleteRequest } = useRequest({}),
        [selectingTerms, setSelectingTerms] = useRecoilState(selectingTermsToReviewState),
        numTermsToReview = useRecoilValue(numTermsToReviewState),
        setListAtom = useSetRecoilState(listState),
        setTermsToReview = useSetRecoilState(termsToReviewState),
        resetTermsToReview = useResetRecoilState(termsToReviewState);

    const termsToDisplay = useMemo(() => {
        return filterTermsBySaturation(terms)
            ?.map(term => term.element)
    }, [terms, filter, numTermsToReview]);

    function filterTermsBySaturation(terms) {
        return terms
            ?.filter(term => {
                if (filter.saturation?.level) {
                    if (!term.saturation) { return true }

                    if (filter.saturation.direction !== 'any') {
                        return term.saturation?.[filter.saturation.direction] === Number(filter?.saturation.level)
                    }
                    return (
                        term.saturation?.forwards === Number(filter?.saturation.level) ||
                        term.saturation?.backwards === Number(filter?.saturation.level)
                    )
                } else {
                    return true
                }
            })
    };

    useEffect(() => {  // retrieve list on component load
        setGetRequest(() => getList(params.username, { _id: params.id }))
    }, [])

    useEffect(() => {  // set list and list context when list is returned from API
        if (getResponse) {
            setList(getResponse);
            setListAtom(getResponse);
        }
    }, [getResponse])

    useEffect(() => {
        if (list && list.terms) { updateTerms() };      /*  updateTerms needs to be called only AFTER list has been put into state, since this depends on list */
    }, [list])

    function updateTerms() {
        setTerms(list.terms.map((term, idx) => {
            let termProps = {
                handleTermDelete,
                key: `term-${term._id}`,
                idx: idx,
                term
            };

            return (
                {
                    saturation: term.saturation,
                    element: <ListTerm {...termProps} />,
                }
            )

        }));
    };

    function handleListTitleBlur(e) {
        e.persist();
        let updatedList = { ...list, name: e.currentTarget.innerText }
        setList(updatedList);
        setPutListTitleRequest(() => putList(params.username, { _id: params.id }, { ...updatedList, terms: updatedList.terms.map(t => t._id) }))
    }

    function handleTermDelete(idx) {
        const updatedList = { ...list, terms: [...list.terms] };  // need to spread the .terms property since otherwise it's not a (deep?/shallow?) copy
        const termId = updatedList.terms[idx]._id;
        updatedList.terms.splice(idx, 1);
        updatedList.numTerms = updatedList.terms.length
        setList(updatedList);
        setListAtom(updatedList)
        setPutRequest(() => putList(params.username, { _id: updatedList._id, owner: updatedList.owner }, updatedList));
        setTermDeleteRequest(() => deleteTerm(params.username, termId))
    };

    /**
     * Calling this will trigger the delete request for the entire list. 
     */
    function handleDelete() {
        setDeleteRequest(() => deleteList(params.username, { _id: params.id }))
    };

    function updateTermsToReview({ type }) {
        switch (type) {
            case 'all':
                setTermsToReview(list.terms);
                break;
            case 'visible':
                // add all visible terms to termsToReview, as long as they're not already in there
                setTermsToReview(cur => Array.from(new Set([...cur, ...filterTermsBySaturation(list.terms)])));
                break;
            case 'none':
                resetTermsToReview();
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="PageWrapper">
                <div className="List">
                    {deleteResponse && JSON.stringify(deleteResponse)}

                    {list &&

                        <>
                            <h1 className="PageHeader">
                                <section className="List__titlebar">
                                    <div>
                                        <span
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={handleListTitleBlur}
                                            className="List__section--header"
                                        >
                                            {list.name}
                                        </span>
                                        <span> ({list.from} to {list.to})</span>
                                    </div>
                                    <div>
                                        <ListDeleteButton {...{ handleDelete }} />
                                    </div>
                                </section>
                            </h1>

                            <section
                                className="List__header"
                                style={{
                                    gridTemplateColumns: list.sets ? '3fr 1fr' : '2fr 1fr'
                                }}
                            >
                                <section className="List__info">
                                    <header className="List__section--heading">
                                        <span className="List__section--header">List info</span>
                                    </header>
                                    <p className="List__info--item">
                                        There {list.terms.length === 1 ? 'is' : 'are'} <span className="List__info--datum">{list.numTerms}</span> term{list.terms.length === 1 ? '' : 's'} in this list.
                                    </p>
                                    {list.lastReviewed
                                        ?
                                        <>
                                            <p className="List__info--item">
                                                Your latest review was <span className="List__info--datum">{formatDate(list.lastReviewed, 'hh:mma, MMMM Do')} ({timeSince(list.lastReviewed)})</span>.
                                            </p>
                                        </>
                                        :
                                        <p className="List__info--item" style={{ width: 'max-content', backgroundColor: 'blueviolet' }}>You haven't reviewed this list yet. Get on it!</p>
                                    }
                                </section>

                                <section className="List__sets">
                                    <header className="List__section--heading">
                                        <span className="List__section--header">Sets</span>
                                        <PageInfo>
                                            To add this list to a set, go to your Sets overview, or your Lists overview.
                                        </PageInfo>
                                    </header>
                                    <SetPicker />
                                    {!list.sets && <p>This list is not part of any sets.</p>}
                                </section>

                                {terms?.[0].saturation.forwards &&
                                    <section className="List__section">
                                        <header className="List__section--header">
                                            <span className="List__section--heading">Saturation</span>
                                        </header>
                                        {terms && <ListSaturationState terms={terms} />}
                                    </section>
                                }

                            </section>

                            <section className="List__review">
                                <div className="List__review--links">
                                    <Link className="List__review--button" to={`${location.pathname}/review?kind=full`}>Review all terms</Link>
                                    {numTermsToReview > 0 && <Link className="List__review--button" to={`${location.pathname}/review?kind=partial`}>Review {numTermsToReview} selected terms</Link>}
                                </div>
                                <div className="List__review--select">
                                    <label className="List__review--select--label">Select terms to review:</label>
                                    <button onClick={() => setSelectingTerms(cur => !cur)} className="List__review--button">select manually {selectingTerms ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</button>
                                    <button onClick={() => updateTermsToReview({ type: 'all' })} className="List__review--button">select all</button>
                                    <button onClick={() => updateTermsToReview({ type: 'visible' })} className="List__review--button">select visible</button>
                                    <button onClick={() => updateTermsToReview({ type: 'none' })} className="List__review--button">select none</button>
                                </div>
                            </section>

                            <section className="List__content">
                                <ul className="List__terms">
                                    <div>
                                        <div className="List__terms--header">
                                            <header className="List__section--header">
                                                Terms
                                            </header>


                                            <div className="List__terms--saturationfilter">
                                                {filter.saturation.level
                                                    ?
                                                    <span className="List__terms--saturationfilter--display">
                                                        Showing filtered list.
                                                    </span>
                                                    :
                                                    <span className="List__terms--saturationfilter--display">
                                                        Showing all terms.
                                                    </span>
                                                }

                                                {list.sessions?.length > 0 &&
                                                    <SaturationFilter
                                                        filter={filter}
                                                        setFilter={setFilter}
                                                    />
                                                }
                                            </div>

                                        </div>
                                    </div>


                                    {termsToDisplay ? termsToDisplay : <div>Loading terms..</div>}
                                </ul>
                            </section>

                        </>
                    }
                </div>
            </div>
        </>
    )
})

export default List