import React, { memo, useMemo, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './css/List.css';
import { useRouteProps } from '../hooks/routerHooks';
import { getListFromDB } from '../helpers/db.api';
import ListTerm from './ListTerm'
import { v4 as uuidv4 } from 'uuid';

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { match } = useRouteProps();

    function updateTerms() {
        setTerms(list.content.map((term, idx) => {
            let termProps = {
                handleTermDelete,
                key: `list-term-${term.to}`,
                idx: idx,
                term
            }

            return (
                <ListTerm {...termProps} />
            )
        }))
    }

    useEffect(() => {
        getListFromDB({ _id: match.params.id }).then(res => {
            setList(res);
        })
    }, [])

    useEffect(() => {
        if (list) {
            updateTerms();
        }
    }, [list])

    function handleTermDelete(idx) {
        const updatedList = { ...list }
        updatedList.content.splice(idx, 1);
        setList(updatedList);
    }

    return (
        <div className="List">
            { !list && 'Loading list...'}

            { list &&
                <>
                    <h1 className="List__name">{list.name} ({list.from} to {list.to})</h1>
                    <Link className="Link-button" to={{ pathname: `${match.params.id}/review` }}>Review!</Link>
                    <ul>
                        {terms}
                    </ul>
                </>
            }
        </div>
    )
})

export default List

/*
    keys matter a lot! here, setting a key to list-term-${idx} means the state of the ListTerm component depends on the idx,
    which doesn't change if a term is removed, meaning that removing a term then passes on the 'isEditing', 'isConfirmingDelete', etc. states on the the new term that ends up at that index
*/