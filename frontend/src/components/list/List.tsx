import React, { memo, useMemo, useState, useEffect, Key } from "react";
import { Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { getList, putList, deleteList, deleteTerm } from 'helpers/apiHandlers/listHandlers';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { numTermsToReviewState } from 'recoil/selectors/reviewSelectors';
import { selectingTermsToReviewState, listState } from 'recoil/atoms/listAtoms';
import ListTerm from './ListTerm';
import SaturationFilter from 'components/SaturationFilter/SaturationFilter';
import ListDeleteButton from './ListDeleteButton';
import './style/List.scss';
import { termsToReviewState } from "recoil/atoms/reviewAtoms";
import ListSaturationState from "./ListSaturationState";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { suggestTermsForReview } from "helpers/srs/saturation";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { ListInterface, TermElementInterface, FilterInterface, TermPropsInterface } from './list.types';

const List = memo((props) => {
    const [list, setList] = useState<ListInterface | null>(null);
    const [filter, setFilter] = useState<FilterInterface>({ saturation: { level: null, direction: 'any' } });
    const [terms, setTerms] = useState<TermElementInterface[] | null>(null);
    const { params, location } = useRouteProps();
    const { response: getResponse, setRequest: setGetRequest } = useRequest({});
    const { setRequest: setPutRequest } = useRequest({});
    const { setRequest: setPutListTitleRequest } = useRequest({});
    const { response: deleteResponse, setRequest: setDeleteRequest } = useRequest({});
    const { setRequest: setTermDeleteRequest } = useRequest({});
    const [selectingTerms, setSelectingTerms] = useRecoilState(selectingTermsToReviewState);
    const numTermsToReview = useRecoilValue(numTermsToReviewState);
    const setListAtom = useSetRecoilState(listState);
    const setTermsToReview = useSetRecoilState(termsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);
    const suggestedTermsForReview = useMemo(() => {
        if (list) {
            return suggestTermsForReview(list.terms)
        }
    }, [list]);

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
        if (list && list.terms) { updateTerms() };      // updateTerms needs to be called only AFTER list has been put into state, since this depends on list
    }, [list])

    function updateTerms() {
        if (list && list.terms?.length > 0) {
            setTerms(list.terms.map((term, idx) => {
                let termProps: TermPropsInterface = {
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
        }
    };

    function handleListTitleBlur(e) {
        e.persist();

        if (list && list.terms?.length > 0) {
            let updatedList: ListInterface = { ...list, name: e.currentTarget.innerText }
            if (updatedList.terms) {
                setList(updatedList);
                setPutListTitleRequest(() => putList(params.username, { _id: params.id }, { ...updatedList, terms: updatedList.terms.map(t => t._id) }))
            }
        }
    }

    function handleTermDelete(idx) {
        if (list) {
            const updatedList = { ...list, terms: [...list.terms] };  // need to spread the .terms property since otherwise it's not a (deep?/shallow?) copy
            const termId = updatedList.terms[idx]._id;
            updatedList.terms.splice(idx, 1);
            setList(updatedList);
            setListAtom(updatedList)
            setPutRequest(() => putList(params.username, { _id: updatedList._id, owner: updatedList.owner }, updatedList));
            setTermDeleteRequest(() => deleteTerm(params.username, termId))
        }
    };

    /**
     * Trigger the API to DELETE the entire list
     */
    function handleDelete() {
        setDeleteRequest(() => deleteList(params.username, { _id: params.id }))
    };

    function updateTermsToReview({ type, direction }: { type: string, direction?: 'forwards' | 'backwards' }) {
        if (list) {
            switch (type) {
                case 'all':
                        setTermsToReview(list.terms);
                    break;
                case 'visible':  // add all visible terms to termsToReview, as long as they're not already in there
                    setTermsToReview(cur => Array.from(new Set([...cur, ...filterTermsBySaturation(list.terms)])));
                    break;
                case 'none':
                    resetTermsToReview();
                    break;
                case 'overdue':
                    if (suggestedTermsForReview && typeof direction === 'number') {
                        setTermsToReview(suggestedTermsForReview[direction])
                    }
                    break;
                default:
                    break;
            }
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

                                    {/* ---- LIST DELETE BUTTON ---- */}
                                    <div>
                                        <ListDeleteButton {...{ handleDelete }} />
                                    </div>
                                </section>
                            </h1>

                            <section className="List__meta">
                                {/* ---- SATURATION TABLE ---- */}
                                {terms &&
                                    <section className="List__section">
                                        <header className="List__section--header">
                                            <span className="List__section--heading">Progress</span>
                                        </header>
                                        {terms && <ListSaturationState terms={terms} />}

                                        {suggestedTermsForReview && (suggestedTermsForReview.forwards.length > 0 || suggestedTermsForReview.backwards.length > 0)
                                            ?
                                            <div>
                                                <h4 className="List__section--header" style={{ backgroundColor: 'orangered', marginTop: '0.5rem' }}>Due for review:</h4>
                                                <div>
                                                    <BiArrowToRight /> {suggestedTermsForReview.forwards.length} terms due.
                                                    <button
                                                        className="List__review--button"
                                                        onClick={() => updateTermsToReview({ type: 'overdue', direction: 'forwards' })}
                                                    >Select for review.</button>
                                                </div>
                                                <div>
                                                    <BiArrowToLeft /> {suggestedTermsForReview.backwards.length} terms due.
                                                    <button
                                                        className="List__review--button"
                                                        onClick={() => updateTermsToReview({ type: 'overdue', direction: 'backwards' })}
                                                    >Select for review.</button>
                                                </div>
                                            </div>
                                            :
                                            <div className="List__section--header" style={{ color: 'black', backgroundColor: 'deepskyblue', marginTop: '0.5rem' }}>
                                                No terms due for review yet.
                                            </div>
                                        }
                                    </section>
                                }

                                {/* ---- REVIEW SELECTION SECTION ---- */}
                                <section className="List__section">
                                    <header className="List__section--header">Review</header>

                                    <div className="List__section">
                                        <header className="List__section--header">All</header>
                                        <Link className="List__review--button" to={`${location.pathname}/review?kind=full`}>Review all terms</Link>
                                    </div>

                                    <div className="List__section">
                                        <h4 className="List__section--header">Selective</h4>
                                        {numTermsToReview > 0 &&
                                            <Link style={{ marginBottom: '0.4rem' }} className="List__review--button" to={`${location.pathname}/review?kind=partial`}>Review {numTermsToReview} selected terms</Link>
                                        }
                                        <div>
                                            <button onClick={() => setSelectingTerms(cur => !cur)} className="List__review--button">select manually {selectingTerms ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</button>
                                        </div>
                                        <div>
                                            <button onClick={() => updateTermsToReview({ type: 'all' })} className="List__review--button">select all</button>
                                            <button onClick={() => updateTermsToReview({ type: 'visible' })} className="List__review--button">select visible</button>
                                            <button onClick={() => updateTermsToReview({ type: 'none' })} className="List__review--button">select none</button>
                                        </div>
                                    </div>
                                </section>
                            </section>

                            <ul className="List__terms">
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

                                        {list && list.sessions && list.sessions?.length > 0 &&
                                            <SaturationFilter
                                                filter={filter}
                                                setFilter={setFilter}
                                            />
                                        }
                                    </div>
                                </div>

                                {termsToDisplay ? termsToDisplay : <div>Loading terms..</div>}
                            </ul>
                        </>
                    }
                </div>
            </div>
        </>
    )
})

export default List