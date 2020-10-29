import React, { useState, useEffect } from 'react';
import { getUser } from '../helpers/db.api';
import { useRouteProps } from '../hooks/routerHooks';
import './style/User.scss';

const User = () => {
    const { params } = useRouteProps();
    const username = params.username;
    const [user, setUser] = useState(null);

    useEffect(() => { getUser(username).then(res => setUser(res)) }, [])

    return (
        <div className="PageWrapper">
            <div className="User">
                <div className="PageHeader UserHeader">User page for /u/<strong>{username}</strong></div>
            </div>
        </div>
    )
}

export default User;