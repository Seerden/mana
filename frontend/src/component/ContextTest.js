import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginContext } from '../context/LoginContext';

const ContextTest = (props) => {
    const context = useContext(LoginContext)
    console.log(context)
    return (
        // {context}
        <div className="null"></div>
    )
}

export default ContextTest