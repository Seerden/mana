import React, { memo, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './css/List.css';
import { useRouteProps } from '../hooks/routerHooks';
import { getListFromDB } from '../helpers/db.api';
import ListTerm from './ListTerm'

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { match } = useRouteProps();

    useEffect(() => {
        getListFromDB({  _id: match.params.id }).then(res => {
            setList(res);
            setTerms(res.content.map((term, idx) => <ListTerm key={`list-term-${idx}`} idx={idx+1} term={term} />))
        })
    }, [])

    return (
        <div className="List">
            { !list && 'Loading list...'}

            { list &&
                <>
                    <h1 className="List__name">{list.name} ({list.from} to {list.to})</h1>
                    <Link
                        className="Link-button"
                        to={{pathname: `${match.params.id}/review`}}
                    >Review!</Link>

                    <ul>
                        {terms}
                    </ul>
                </>

            }
        </div>
    )
})

export default List