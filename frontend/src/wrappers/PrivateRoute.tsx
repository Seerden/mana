import React from "react";
import { Route } from 'react-router-dom';
import Private from './Private';

interface PrivateRouteProps {
    component: React.FunctionComponent,
    children?: React.ReactChildren | React.ReactChild,
    path: string,
}

const PrivateRoute = ({component: Component, children, ...rest}: PrivateRouteProps) => {

    if (children) {
        console.log(children);
        return null
    }

    return (
        <Route {...rest} element={<Private component={Component}/>}/>
    )
}

export default PrivateRoute