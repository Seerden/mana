import React, { memo, useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './style/List.scss';
import { useRouteProps } from '../../hooks/routerHooks';
import ListTerm from './ListTerm'
import { ListContext } from '../../context/ListContext';
import { extractSession } from '../../helpers/list.api';
import { formatDate } from '../../helpers/time';

import { useRequest } from '../../hooks/useRequest';
import { handleGetList, getList, putList, handlePutList, handleDeleteList, deleteList } from '../../helpers/apiHandlers';
import { useLogState } from "../../hooks/state";

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { params, location } = useRouteProps();
    const { setListContextValue } = useContext(ListContext);

    const { response: getResponse, setRequest: setGetRequest } = useRequest({...handleGetList()});
    const { response: putResponse, setRequest: setPutRequest } = useRequest({...handlePutList()});
    const { response: deleteResponse, setRequest: setDeleteRequest } = useRequest({
        ...handleDeleteList()});

    useLogState('deleteresponse', deleteResponse)

    useEffect(() => {
        setGetRequest(() => getList(params.username, {_id: params.id}))
    }, [])

    useEffect(() => {
        if(getResponse) {
            setList(getResponse);
            setListContextValue(getResponse);
        }
    }, [getResponse])

    useEffect(() => {
        if (list) {
            if (list.sessions.length > 0) {
                console.log(extractSession(list, 0));
            }
        }

        if (list && list.content && list.content.length > 0) {
            updateTerms();
            /*  updateTerms needs to be called only AFTER list has been put into state, since this depends on list
                this means I can't call updateTerms(res) inside the useEffect hook above (where I do getListFromDb.then(res => setList(res))) */
        }
    }, [list])

    const updateTerms = () => {
        setTerms(list.content.map((term, idx) => {
            let termProps = {
                handleTermDelete,
                key: `list-term-${term.to}-${term.from}`,
                idx: idx,
                term
            }

            return (
                <ListTerm {...termProps} />
            )
        }))
    }

    function handleTermDelete(idx) {
        const updatedList = { ...list }
        updatedList.content.splice(idx, 1);
        updatedList.numTerms = updatedList.content.length
        setList(updatedList);
        setListContextValue(updatedList)

        setPutRequest(() => putList(params.username, { _id: updatedList._id, owner: updatedList.owner }, updatedList))
    }

    function handleDelete() {
        setDeleteRequest(() => deleteList(params.username, { _id: params.id }))
    }

    return (
        <>
            <div className="PageWrapper">
                <div className="List">
                    { deleteResponse && JSON.stringify(deleteResponse)}

                    {list &&
                        <>
                            <div className="PageHeader">{list.name} ({list.from} to {list.to})</div>
                            <button className="Button"><Link to={`${location.pathname}/review`}>Review</Link></button>
                            <button className="Button danger" onClick={() => handleDelete()}>Delete this list</button>

                            <section className="List__info">
                                <header className="List__info--header">List info</header>
                                <p className="List__info--item">There are <span className="List__info--datum">{list.numTerms}</span> terms in this list.</p>
                                { list.lastReviewed 
                                    ?
                                        <p className="List__info--item">You last reviewed this list
                                            <span className="List__info--datum">
                                                {formatDate(list.lastReviewed, 'hh:mma, MMMM Do')}
                                            </span>
                                        </p>
                                    :
                                        <p className="List__info--item" style={{width: 'max-content', backgroundColor: 'blueviolet'}}>You haven't reviewed this list yet. Get on it!</p>
                                }

                            </section>

                            <section className="List__content">
                                <ul className="terms">
                                    <header className="List__terms--header">Terms</header>
                                    {terms}
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