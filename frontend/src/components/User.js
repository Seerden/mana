import React, { useState, useEffect } from 'react';
import { getUser } from '../helpers/db.api';
import { useRouteProps,  } from '../hooks/routerHooks';

const User = () => {
    const { params } = useRouteProps();
    const username = params.username;
    const [user, setUser] = useState(null);

    useEffect(() => { getUser(username).then(res => setUser(res)) }, [])

    return (
        <div className="User">
            <h1>User page for /u/<strong>{username}</strong></h1>
        </div>
    )
}

export default User;