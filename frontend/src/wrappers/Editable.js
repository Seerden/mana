import React, { memo, useState } from "react";

/**
 * React component wrapper, to use when a single read-only component should be swapped to an editable component on click
* @param   {jsx}   initialState    jsx component to display when not editing
* @param   {jsx}   editState       jsx component to display when editing
* @comment     note that attaching click handlers to a jsx element won't really work, since the fragment isn't tangible
* @current     attaches onClick handler to the initial component to swap to editing state.
*              attaches onBlur handler to editing component to swap back to initial state
* @return {React.Component}    React component
* 
*/
const Editable = memo(({ initialState, editState }) => {
    const [editing, setEditing] = useState(false);

    const handleClick = () => {
        setEditing(true);
    }

    const handleBlur = () => {
        // @todo copy any existing onClick and append the new onClick functionality to it, so that I don't need to wrap the returned JSX in another div
        // might be very difficult, since might be nested deeply. might be a lost cause
        setEditing(false);
    }

    return (
        <>
            { !editing &&
                React.cloneElement(initialState, { onClick: () => handleClick() })
                // <div onClick={handleClick}>
                //     {initialState}
                // </div>

            }
            { editing &&
                // React.cloneElement(editState, {onBlur: () => handleBlur()})
                <div onBlur={handleBlur}>
                    {editState}
                </div>
            }

        </>
    )
})

export default Editable