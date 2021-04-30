import React from "react";
import { ListInterface } from "../list.types";
import ListDeleteButton from '../ListDeleteButton';

interface ListTitleBarProps {
    handleListTitleBlur(e: any): void,
    list: ListInterface,
    handleDelete(): void
}

const ListTitleBar = ({ handleListTitleBlur, list, handleDelete }: ListTitleBarProps) => {

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