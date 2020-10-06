import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <h2>
                Lists by u/{username}
            </h2>

            { lists && 
                lists.map(l => {
                    return (
                        <Link to={`/lists/${l._id}`}>{l.name}</Link>
                    )
                })
            }
        </div>
    )
}

export default ListsByUser;