import React, { memo } from "react";
import './ListTermDeleteButton.scss';

/**
 * JSX delete button element that turns into two buttons: 'delete' and 'keep'
 * @note    note really a reusable component, since everything is hardcoded. the component exists mostly to limit ListTerm's LOC, for readability * 
 * @param {object} props    confirmingDelete is a boolean piece of react state,
 *                          handleConfirmClick is the confirm click handler (managed by parent component),
 *                          isHovering is a piece of state managed by ListTerm: hovering the button's parent causes the button to become visible
 * @return {JSX} jsx fragment containing the toggleable button
 */
const ListTermDeleteButton = memo(({ confirmingDelete, setConfirmingDelete, handleConfirmClick, isHovering }) => {
    return (
        <>
            { confirmingDelete &&
                <div className="Term__remove remove--confirm">
                    <input
                        title="Keep term"
                        onClick={e => handleConfirmClick(e, 'keep')}
                        className="remove--keep" type="button" value="keep" />
                    <input
                        title="Permanently delete term"
                        onClick={(e) => handleConfirmClick(e, { type: 'delete' })}
                        className="remove--delete" type="button" value="delete" />
                </div>
            }

            { !confirmingDelete && isHovering &&
                <input
                    onClick={() => setConfirmingDelete(true)}
                    className="Term__remove remove--initial"
                    type="button"
                    value="x"
                />
            }
        </>
    )
})

export default ListTermDeleteButton