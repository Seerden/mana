
import React from "react";

/**
 * NewList test component
 * @param {*} props 
 */
const Test = (props) => {
    let numTerms = 10;  // @todo: set global defaults like this in database or backend somewhere

    return (
        <div className="Test">hi</div>
        // <div className="NewList__wrapper">
        //     <h1 className="NewList__header">Create a new list</h1>

        //     <form className="NewList__form">
        //         <div className="NewList__form--languages">
        //             <div className="NewList__form--languages--side">
        //                 <label htmlFor="language-from">Original language:</label>
        //                 <input type="text" name="language-from" />
        //             </div>
        //             <div className="NewList__form--languages--side">
        //                 <label htmlFor="language-to">Translated language:</label>
        //                 <input type="text" name="language-to" />
        //             </div>
        //         </div>
        //         <NewTerm/>
        //     </form>
        // </div>
    )
}

export default Test