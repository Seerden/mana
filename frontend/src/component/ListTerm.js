import React from "react";

const ListTerm = ({term, idx}) => {

    return (
        <li className="List__term">
            <div className="List__term-index">{idx}</div>
            <div className="List__term-from">{term.from}</div>
            <div className="List__term-to">{term.to}</div>
        </li>
    )
}

export default ListTerm