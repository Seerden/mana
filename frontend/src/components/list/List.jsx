import React, { memo, useMemo, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';

import { formatDate } from 'helpers/time';
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
import { handleError, handleResponse } from "helpers/apiHandlers/apiHandlers";
import { termsToReviewState } from "recoil/atoms/reviewAtoms";
import ListSaturationState from "./ListSaturationState";

const List = memo((props) => {
    const [list, setList] = useState(null),
        [filter, setFilter] = useState({ saturation: { level: null, direction: 'any' } }),
        [terms, setTerms] = useState(null),
        { params, location } = useRouteProps(),
        { response: getResponse, setRequest: setGetRequest } = useRequest({}),
        { setRequest: setPutRequest } = useRequest({}),
        { response: deleteResponse, setRequest: setDeleteRequest } = useRequest({}),
        { setRequest: setTermDeleteRequest } = useRequest({ handleResponse, handleError }),
        [selectingTerms, setSelectingTerms] = useRecoilState(selectingTermsToReviewState),
        numTermsToReview = useRecoilValue(numTermsToReviewState),
        setListAtom = useSetRecoilState(listState),
        setTermsToReview = useSetRecoilState(termsToReviewState);

    const termsToDisplay = useMemo(() => {
        return filterTermsBySaturation(terms)
            ?.map(term => term.element)
    }, [terms, filter]);

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

    return (
        <>
            <div className="PageWrapper">
                <div className="List">
                    {deleteResponse && JSON.stringify(deleteResponse)}

                    {list &&
                        <>
                            <h1 className="PageHeader">{list.name} ({list.from} to {list.to})</h1>

                            <section className="List__banner">
                                <div className="List__banner--review">
                                    <button
                                        className="Button"
                                    >
                                        <Link
                                            onClick={() => setTermsToReview(list.terms)}
                                            to={`${location.pathname}/review?kind=full`}
                                        >
                                            Review entire list
                                        </Link>
                                    </button>

                                    {numTermsToReview > 0 && <button className="Button">Review selected terms</button>}

                                    <span>
                                        <input
                                            type="button"
                                            className="Button"
                                            value="Select terms for review"
                                            onClick={() => setSelectingTerms(!selectingTerms)}
                                        />
                                    </span>
                                </div>
                                <ListDeleteButton {...{ handleDelete }} />
                            </section>
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
                                                You've reviewed this list <span className="List__info--datum">{list.sessions.length} time{list.sessions.length !== 1 ? 's' : ''}</span>,

                                            </p>
                                            <p className="List__info--item">
                                                Your most recent review was <span className="List__info--datum">{formatDate(list.lastReviewed, 'hh:mma, MMMM Do')}</span>.
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

                            </section>

                            <section className="List__section">
                                <header className="List__section--header">
                                    <span className="List__section--heading">Saturation</span>
                                </header>
                                { terms && <ListSaturationState terms={terms}/> }
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