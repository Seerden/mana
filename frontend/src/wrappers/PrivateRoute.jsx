import React from "react";
import { Route } from 'react-router-dom';
import Private from './Private';

const PrivateRoute = ({component: Component, children, ...rest}) => {

    if (children) {
        console.log(children);
        return null
    }

    return (
        <Route {...rest} element={<Private component={Component}/>}/>
    )
}

export default PrivateRoute