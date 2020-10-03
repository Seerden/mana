import React from 'react';

import './css/NewList.component.css';
import NewList__Term from './NewList__Term';

function NewList() {
    const numTerms = 10;  // allow user to set default number of terms when making new list
    const termEls = [];

    for (let i = 0; i < numTerms; i++) {
        termEls.push(
            <div className="NewList__Terms-term">
                <div className="NewList__Terms-index">{i+1}</div>
                <NewList__Term index={i+1} />
            </div>
            
        )
    }



    return (
        <div className="NewList">
            <header>
                <h1 className="PageHeader">
                    New List
                </h1>
            </header>

            <form className="Form">

                <div className="NewList__Header">
                    <span>Definition</span>
                    <span>Meaning</span>
                </div>
                <div className="NewList__Terms">
                    {termEls}
                </div>
            </form>
        </div>
    )
}

export default NewList
