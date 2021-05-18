import React from "react";
import './style/Footer.scss';

const Footer = (props) => {

    return (
        <div className="Footer">
            <div className="Footer__item"><a href="https://github.com/Seerden/mana">
            <img
            src={`${process.env.PUBLIC_URL}/assets/github.png`}
            width="16"
            height="16"
            alt="GitHub Logo"
            />
            </a></div>
        </div>
    )
}

export default Footer