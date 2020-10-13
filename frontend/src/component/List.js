import React, { memo, useCallback, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './css/List.css';
import { useRouteProps } from '../hooks/routerHooks';
import { getListFromDB } from '../helpers/db.api';
import ListTerm from './ListTerm'

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { match } = useRouteProps();

    function updateTerms () {
        if(list) {
            setTerms(list.content.map((term, idx) => {
                let termProps = {
                    handleTermDelete,
                    key: `list-term-${idx}`,
                    idx: idx,
                    term
                }
            
                return (
                    <ListTerm {...termProps} />
                )
            }))
        }
        
    }

    useEffect(() => {
        getListFromDB({  _id: match.params.id }).then(res => {
            setList(res);
            console.log(list)
        })
    }, [])

    useEffect(() => {
        if (list) {
            updateTerms();
        }
    }, [list])

    const handleTermDelete = (idx) => {
        console.log('deleting term at index', idx);

        const updatedList = {...list}
        updatedList.content.splice(idx, 1);
        setList(updatedList);

    }

    return (
        <div className="List">
            { !list && 'Loading list...'}

            { list &&
                <>
                    <h1 className="List__name">{list.name} ({list.from} to {list.to})</h1>
                    <Link className="Link-button" to={{pathname: `${match.params.id}/review`}}>Review!</Link>
                    <ul>
                        {terms}
                    </ul>
                </>

            }
        </div>
    )
})

export default List