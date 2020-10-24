import React, { useState, useEffect } from 'react';
import { getUser } from '../helpers/db.api';
import { useRouteProps } from '../hooks/routerHooks';

const User = () => {
    const { params } = useRouteProps();
    const username = params.username;
    const [user, setUser] = useState(null);

    useEffect(() => { getUser(username).then(res => setUser(res)) }, [])

    return (
        <div className="PageWrapper">
            <div className="User">
                <div className="PageHeader">User page for /u/<strong>{username}</strong></div>
            </div>
        </div>
    )
}

export default User;