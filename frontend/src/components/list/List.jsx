import React, { memo, useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ListTerm from './ListTerm'
import { ListContext } from '../../context/ListContext';
import { formatDate } from '../../helpers/time';
import { handleGetList, getList, putList, handlePutList, handleDeleteList, deleteList } from '../../helpers/apiHandlers';
import { useRouteProps } from '../../hooks/routerHooks';
import { useRequest } from '../../hooks/useRequest';
import './style/List.scss';

const List = memo((props) => {
    const [list, setList] = useState(null),
        [terms, setTerms] = useState(null),
        { params, location } = useRouteProps(),
        { setListContextValue } = useContext(ListContext),
        [sessions, setSessions] = useState(null),
        { response: getResponse, setRequest: setGetRequest } = useRequest({ ...handleGetList() }),
        { response: putResponse, setRequest: setPutRequest } = useRequest({ ...handlePutList() }),
        { response: deleteResponse, setRequest: setDeleteRequest } = useRequest({ ...handleDeleteList() });

    useEffect(() => {
        setGetRequest(() => getList(params.username, { _id: params.id }))
    }, [])

    useEffect(() => {
        if (getResponse) {
            setList(getResponse);
            setListContextValue(getResponse);
        }
    }, [getResponse])

    useEffect(() => {
        if (list && list.content) { updateTerms() };      /*  updateTerms needs to be called only AFTER list has been put into state, since this depends on list */
    }, [list])

    const updateTerms = () => {
        setTerms(list.content.map((term, idx) => {
            let termProps = {
                handleTermDelete,
                key: `list-term-${term.to}-${term.from}`,
                idx: idx,
                term
            }

            return (<ListTerm {...termProps} />)
        }))
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
                            <button className="Button"><Link to={`${location.pathname}/review`}>Review</Link></button>
                            <button className="Button danger" onClick={() => handleDelete()}>Delete this list</button>

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

                            <section className="List__content">
                                <ul className="terms">
                                    <header className="List__section--header">Terms</header>
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