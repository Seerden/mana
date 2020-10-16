import React, { memo, useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './css/List.css';
import { useRouteProps } from '../hooks/routerHooks';
import { getListFromDB, updateList } from '../helpers/db.api';
import ListTerm from './ListTerm'
import { ListContext } from '../context/ListContext';

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { params, location } = useRouteProps();
    const { listContextValue, setListContextValue } = useContext(ListContext);

    function updateTerms() {
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
        const updatedList = {...list}
        updatedList.content.splice(idx, 1);
        setList(updatedList);
        setListContextValue(updatedList)
        updateList({_id: updatedList._id, owner: updatedList.owner}, updatedList)
            .then(r => console.log('removed item from list in db'))
    }

    return (
        <>
        <div className="List">
            { !list && 'Loading list...'}

            { list &&
                <>
                    <h1 className="List__name">{list.name} ({list.from} to {list.to})</h1>
                    <Link className="Link-button" to={`${location.pathname}/review`}>Review!</Link>
                    <ul>
                        {terms}
                    </ul>
                </>
            }
        </div>
        </>
    )
})

export default List

/*
    keys matter a lot! here, setting a key to list-term-${idx} means the state of the ListTerm component depends on the idx,
    which doesn't change if a term is removed, meaning that removing a term then passes on the 'isEditing', 'isConfirmingDelete', etc. states on the the new term that ends up at that index
*/