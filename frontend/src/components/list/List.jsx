import React, { memo, useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './List.css';
import { useRouteProps } from '../../hooks/routerHooks';
import { deleteList, getList, updateList } from '../../helpers/db.api';
import ListTerm from './ListTerm'
import { ListContext } from '../../context/ListContext';
import { extractSession } from '../../helpers/list.api';
import { formatDate } from '../../helpers/time';

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { params, location } = useRouteProps();
    const { listContextValue, setListContextValue } = useContext(ListContext);

    useEffect(() => {
        if (list) {
            if (list.sessions.length > 0) {
                console.log(extractSession(list, 0));
            }
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

    useEffect(() => {
        getList({ _id: params.id }).then(res => {
            setList(res);
            setListContextValue(res)
        })
    }, [])

    useEffect(() => {
        if (list && list.content && list.content.length > 0) {
            updateTerms();
            /*  updateTerms needs to be called only AFTER list has been put into state, since this depends on list
                this means I can't call updateTerms(res) inside the useEffect hook above (where I do getListFromDb.then(res => setList(res))) */
        }
    }, [list])

    function handleTermDelete(idx) {
        const updatedList = { ...list }
        updatedList.content.splice(idx, 1);
        setList(updatedList);
        setListContextValue(updatedList)
        updateList({ _id: updatedList._id, owner: updatedList.owner }, updatedList)
            .then(r => console.log('removed item from list in db'))
    }

    function handleDelete() {
        deleteList({ _id: params.id })
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className="PageWrapper">
                <div className="List">
                    {!list && 'Loading list...'}

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