import React, { memo, useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { ListContext } from 'context/ListContext';
import { formatDate } from 'helpers/time';
import { handleGetList, getList, putList, handlePutList, handleDeleteList, deleteList } from 'helpers/apiHandlers/listHandlers';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { termsToReviewState } from 'recoil/atoms/reviewAtoms';
import { selectingTermsToReviewState } from 'recoil/atoms/listAtoms';

import ListTerm from './ListTerm';
import SetPicker from './SetPicker';
import SaturationFilter from './SaturationFilter';

import './style/List.scss';

const List = memo((props) => {
    const [list, setList] = useState(null),
        [filter, setFilter] = useState({}),
        [terms, setTerms] = useState(null),
        { params, location } = useRouteProps(),
        { setListContextValue } = useContext(ListContext),
        { response: getResponse, setRequest: setGetRequest } = useRequest({ ...handleGetList() }),
        { setRequest: setPutRequest } = useRequest({ ...handlePutList() }),
        { response: deleteResponse, setRequest: setDeleteRequest } = useRequest({ ...handleDeleteList() });

    // ----- REFACTOR
    const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
    const [selectingTerms, setSelectingTerms] = useRecoilState(selectingTermsToReviewState);
    // -----

    useEffect(() => {  // retrieve list on component load
        setGetRequest(() => getList(params.username, { _id: params.id }))
    }, [])

    useEffect(() => {  // set list and list context when list is returned from API
        if (getResponse) {
            setList(getResponse);
            setListContextValue(getResponse);
        }
    }, [getResponse])

    useEffect(() => {
        if (list && list.content) { updateTerms() };      /*  updateTerms needs to be called only AFTER list has been put into state, since this depends on list */
    }, [list])

    function updateTerms() {
        setTerms(list.content.map((term, idx) => {
            let termProps = {
                handleTermDelete,
                key: `list-term-${term.to}-${term.from}`,
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
        const updatedList = { ...list }
        updatedList.content.splice(idx, 1);
        updatedList.numTerms = updatedList.content.length
        setList(updatedList);
        setListContextValue(updatedList)

        setPutRequest(() => putList(params.username, { _id: updatedList._id, owner: updatedList.owner }, updatedList))
    };

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
                            <div className="PageHeader">{list.name} ({list.from} to {list.to})</div>

                            <section className="List__banner">
                                <div className="List__banner--review">
                                    <button className="Button"><Link to={`${location.pathname}/review`}>Review entire list</Link></button>
                                    <button className="Button">Review selected terms</button>
                                </div>
                                <button className="Button danger" onClick={() => handleDelete()}>Delete this list</button>
                            </section>
                            <section
                                className="List__header"
                                style={{
                                    gridTemplateColumns: list.sets ? '3fr 1fr' : '2fr 1fr'
                                }}
                            >
                                <section className="List__info">
                                    <header className="List__section--header">List info</header>
                                    <p className="List__info--item">
                                        There {list.content.length === 1 ? 'is' : 'are'} <span className="List__info--datum">{list.numTerms}</span> term{list.content.length === 1 ? '' : 's'} in this list.
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
                                    <header className="List__section--header">
                                        Sets
                                    </header>
                                    <SetPicker />
                                    {!list.sets && <p>This list is not part of any sets.</p>}
                                </section>

                            </section>


                            <section className="List__content">
                                <ul className="List__terms">
                                    <div>
                                        <div className="List__terms--header">
                                            <span className="List__section--header">
                                                Terms
                                            </span>

                                            <span>
                                                <input 
                                                    type="button" 
                                                    value="Select terms for review"
                                                    onClick={() => setSelectingTerms(!selectingTerms)}
                                                />
                                            </span>

                                            <div className="List__terms--saturationfilter">
                                                {list.sessions?.length > 0 &&
                                                    <SaturationFilter
                                                    filter={filter}
                                                    setFilter={setFilter}
                                                />
                                                }
                                            </div>


                                        </div>
                                    </div>

                                    {terms
                                        ?.filter(term => {
                                            if (Object.keys(filter).length > 0) {
                                                if (!term.saturation) { return true }
                                                return term.saturation?.forwards === Number(filter?.saturation) || term.saturation?.backwards === filter?.saturation
                                            } else {
                                                return true
                                            }
                                        })
                                        ?.map(term => term?.element)
                                    }
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