import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Lists.css'
import { useRouteProps } from '../hooks/routerHooks';

const ListsByUser = memo((props) => {
    const { match, location, history } = useRouteProps();
    const username = match.params.username;
    const [lists, setLists] = useState(null);

    useEffect(() => {
        axios.get(`/db/listsbyuser/${username}`).then(r => {
            setLists(r.data);
        })
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        // console.log(location);
        history.push(`${location.pathname}/new`)
    }

    return (
        <div className="ListsByUser">
            <h1 className="PageHead">
                Lists by u/{username}
            </h1>
            <input type="button" value="New List" onClick={handleClick}/>

            { !lists &&
                <div>Loading lists...</div>
            }
            { lists &&
                lists.map((l,idx) => {
                    return (
                        <div key={`link-list-${idx}`} className="Link-div">
                            <div className="Link-div__link">
                                <Link className="Lists-link" to={`/list/${l._id}`}>{l.name}</Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
})

export default ListsByUser;

// @ TODO | memoize lists so I don't have to call DB every single time

// @ TODO: scrolling through this page: links go over header. fix header position/z-index
