import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Lists.css'

const ListsByUser = ({history, location, match}) => {
    const username = match.params.username;
    const [lists, setLists] = useState(null);

    useEffect(() => {
        axios.get('/db/listsbyuser/seerden').then(r => {
            setLists(r.data);
        })
    }, [])

    return (
        <div className="ListsByUser">
            <h1>
                Lists by u/{username}
            </h1>

            { !lists && 
                <div>Loading lists...</div>
            }
            { lists && 
                lists.map(l => {
                    return (
                        <div className="Link-div">
                            <Link className="Lists-link" to={`/list/${l._id}`}>{l.name}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListsByUser;

// @ TODO | memoize lists so I don't have to call DB every single time