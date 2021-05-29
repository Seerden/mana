import { List } from "graphql/codegen-output";
import React from "react";
import ListDeleteButton from './ListDeleteButton';

import './ListTitleBar.scss';

interface ListTitleBarProps {
    handleListTitleBlur(e: any): void,
    list: List,
    handleDelete(): void
}

const ListTitleBar = ({ handleListTitleBlur, list, handleDelete }: ListTitleBarProps) => {
    const base = "List__TitleBar"

    return (
        <section className={`${base}`}>
            <header className={`${base}__header`}>
                <h3
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleListTitleBlur}
                    className={`${base}__header--listname`}
                >
                    {list.name}
                </h3>
                <span className={`${base}__header--languages`}>({list.from} to {list.to})</span>
            </header>

            <ListDeleteButton {...{ handleDelete }} />
        </section>
    )
}

export default ListTitleBar