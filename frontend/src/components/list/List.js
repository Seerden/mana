import React, { memo, useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './List.css';
import { useRouteProps } from '../../hooks/routerHooks';
import { deleteListFromDB, getListFromDB, updateList } from '../../helpers/db.api';
import ListTerm from './ListTerm'
import { ListContext } from '../../context/ListContext';
import { extractSession } from '../../helpers/list.api';

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { params, location } = useRouteProps();
    const { listContextValue, setListContextValue } = useContext(ListContext);

    useEffect(() => {
        if (list) {
            if (list.sessions.length > 0 ) {
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
        getListFromDB({ _id: params.id }).then(res => {
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

    function handleDelete(){
        deleteListFromDB({_id: params.id})
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className="List">
                {!list && 'Loading list...'}

                {list &&
                    <>
                        <h1 className="List__name">{list.name} ({list.from} to {list.to})</h1>
                        <button className="Button"><Link to={`${location.pathname}/review`}>Review</Link></button>
                        <button className="Button danger" onClick={() => handleDelete()}>Delete this list</button>
                        <div className="List__content">

                            <div className="List__content--terms">
                                <div className="List__content--header">
                                    Terms
                                </div>
                                <div className="Terms__header">
                                    <div className="Terms__header--index">#</div>
                                    <div className="Terms__header--from">From</div>
                                    <div className="Terms__header--to">To</div>
                                </div>
                                <ul>
                                    {terms}
                                </ul>
                            </div>
                            {/* <div className="List__content--sessions">
                                { listContextValue && listContextValue.sessions && listContextValue.sessions.length > 0 
                                    ?
                                     <ListSessions sessions={(listContextValue && listContextValue.sessions) ? listContextValue.sessions : null}/>
                                    : <div>No sessions recorded for this list</div>
                                }
                            </div> */}

                        </div>
                    </>
                }
            </div>
        </>
    )
})

export default List