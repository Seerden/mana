import React, { useState, useEffect } from 'react';
import { getUserFromDb } from '../helpers/backend.api';

const User = ({history, location, match}) => {
    const username = match.params.username;
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserFromDb(username, { populate: 'lists'}).then(res => {
            setUser(res)
            console.log(res.lists)
        })

    }, [])

    return (
        
        <div className="User">
            <h1>User page for /u/<strong>{username}</strong></h1>
            <div className="User-info">
                { user && JSON.stringify(user) }
            </div>
        </div>
    )
}

export default User;