import React from "react";
import './Register.css';

const Register = (props) => {
    
    return (
        <div className="PageWrapper">
            <div className="Register">
                <div className="PageHeader">Register a new account</div>
                <form className="Register__form">

                </form>
            </div>
        </div>

    )
}

export default Register

/* 
    - should only be visible when not logged in, but include a check to confirm, anyway.
    - accounts are streamlined. only take username, password (figure out hashing)
*/