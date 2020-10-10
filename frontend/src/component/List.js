import React, { memo, useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/List.css';
import { useRouteProps } from '../hooks/routerHooks';

const List = memo((props) => {
    const [list, setList] = useState(null);
    const [terms, setTerms] = useState(null);
    const { match } = useRouteProps();

    useEffect(() => {
        axios.get(`/db/listbyid/${match.params.id}`).then(r => setList(r.data));
    }, [])

    useEffect(() => {
        if (list) {
            setTerms(list.content.map((i, idx) => {
                return (
                    <div key={`list-term-${idx}`} className="List__term">
                        <div className="List__term-index">{idx}</div>
                        <div className="List__term-from">{i.from}</div>
                        <div className="List__term-to">{i.to}</div>
                    </div>
                )
            }))
        }
    }, [list])

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
                    {terms}
                </>

            }
        </div>
    )
})

export default List