import React, { memo, useState } from "react";

/**
     * @param   {jsx}   initialState    jsx component to display when not editing
     * @param   {jsx}   editState       jsx component to display when editing
     * 
     * @comment note that attaching click handlers to a jax element won't really work, since the fragment isn't tangible
     * 
     * @current     attaches onClick handler to the initial component to swap to editing state
     *              attaches onBlur handler to editing component to swap back to initial state
     * @future      -
     * 
     */

const Editable = memo(({ initialState, editState }) => {
    const [editing, setEditing] = useState(false);

    const handleClick = () => {
        console.log('Clicked editable');
        setEditing(true);
    }

    const handleBlur = () => {
        setEditing(false);
    }

    return (
        // React.cloneElement(initialState, {onClick: () => handleClick()})
        <>
        { !editing && 
            <div onClick={handleClick}>
                { initialState } 
            </div>
        }
        { editing && 
            <div onBlur={handleBlur}>
                { editState }
            </div>
                // React.cloneElement(editState, {onBlur: () => handleBlur()})
        }

        </>
    )
})

export default Editable