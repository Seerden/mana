import React, { useState, useEffect } from 'react';
import { getUserFromDB } from '../helpers/db.api';
import { useRouteProps,  } from '../hooks/routerHooks';

const User = () => {
    const { params } = useRouteProps();
    const username = params.username;
    const [user, setUser] = useState(null);

    useEffect(() => {  // get user from db, then setUser
        getUserFromDB(username).then(res => {
            setUser(res)
        })
    }, [])

    return (
        <div className="User">
            <h1>User page for /u/<strong>{username}</strong></h1>
        
            
        </div>
    )
}

export default User;