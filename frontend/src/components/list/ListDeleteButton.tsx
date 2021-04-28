import React, { useState } from "react";
import { useToggle } from "hooks/useToggle";
import './style/ListDeleteButton.scss'

const ListDeleteButton = ({ handleDelete }) => {
    const [confirming, toggleConfirming] = useToggle(false);

    return (
            <span className="ListDeleteButton">
                <input
                    onClick={() => toggleConfirming()}
                    type="button"
                    className="ListDeleteButton__button--initial"
                    value="Delete list"
                />

                {confirming &&
                    <>
                        <input
                            onClick={handleDelete}
                            type="button"
                            className="ListDeleteButton__button--confirm ListDeleteButton__button--confirm--yes"

                            value="Yes"
                        />
                        <input
                            onClick={toggleConfirming}
                            type="button"
                            className="ListDeleteButton__button--confirm ListDeleteButton__button--confirm--no"
                            value="No"
                        />
                    </>
                }
            </span>
    )
}

export default ListDeleteButton