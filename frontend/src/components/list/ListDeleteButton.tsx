import React from "react";
import { useToggle } from "hooks/useToggle";
import './style/ListDeleteButton.scss'

const ListDeleteButton = ({ handleDelete }) => {
    const [confirming, toggleConfirming] = useToggle(false);

    return (
        <span className="ListDeleteButton">
            {!confirming
                ?
                <input
                    onClick={() => toggleConfirming()}
                    type="button"
                    className="ListDeleteButton__button--initial"
                    value="Delete list"
                />
                : 
                <>
                    <input
                        onClick={handleDelete}
                        type="button"
                        className="ListDeleteButton__button--confirm ListDeleteButton__button--confirm--yes"

                        value="Delete"
                    />
                    <input
                        onClick={toggleConfirming}
                        type="button"
                        className="ListDeleteButton__button--confirm ListDeleteButton__button--confirm--no"
                        value="Keep"
                    />
                </>

            }
        </span>
    )
}

export default ListDeleteButton