import React from "react";
import ListDeleteButton from '../ListDeleteButton';

const ListTitleBar = ({ handleListTitleBlur, list, handleDelete }) => {

    return (
        <h1 className="PageHeader">

            <section className="List__titlebar">
                <div>
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleListTitleBlur}
                        className="List__section--header"
                    >
                        {list.name}
                    </span>
                    <span> ({list.from} to {list.to})</span>
                </div>

                <ListDeleteButton {...{ handleDelete }} />
            </section>
        </h1>
    )
}

export default ListTitleBar