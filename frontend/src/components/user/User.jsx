import React, { useState, useEffect } from 'react';
import { useRouteProps } from '../../hooks/routerHooks';
import './style/User.scss';

const User = () => {
    const { params } = useRouteProps();
    const username = params.username;

    return (
        <div className="PageWrapper">
            <div className="User">
                <div className="PageHeader UserHeader">User page for /u/{params.username}</div>
            </div>
        </div>
    )
}

export default User;