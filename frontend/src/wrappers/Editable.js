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
    const [editing, setIsEditing] = useState(false);

    return (
        <>
            { !editing &&
                React.cloneElement(initialState, { onClick: () => setIsEditing(true) })
                // <div onClick={handleClick}>
                //     {initialState}
                // </div>

            }
            { editing &&
                // React.cloneElement(editState, {onBlur: () => handleBlur()})
                <div onBlur={() => setIsEditing(false)}>
                    {editState}
                </div>
            }

        </>
    )
})

export default Editable