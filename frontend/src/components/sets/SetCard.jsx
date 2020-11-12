import React, { useState } from "react";
import './style/SetCard.scss'
import { Link } from 'react-router-dom'
import { useRouteProps } from "hooks/routerHooks";

const SetCard = ({ set }) => {
    const { params } = useRouteProps();
    const { name, description, lists } = set;

    return (
        <div className="SetCard">
            <header className="SetCard__header">
                <span>{name}</span>
            </header>

            <section className="SetCard__description">
                <label
                    htmlFor="description"
                    className="SetCard__label"
                >
                    Description
                    </label>
                <div
                    name="description"
                    className="SetCard__description--body"
                >
                    {description}
                </div>
            </section>

            <section>
                <ul
                    className="SetCard__lists"
                >
                    <label className="SetCard__label">Lists</label>
                    <div className="SetCard__lists--body">
                        {lists.map(list =>
                            <li
                                className="SetCard__list"
                                key={list.name}
                            >
                                <Link
                                    className="SetCard__list--link"
                                    to={`/u/${params.username}/list/${list._id}`}
                                >
                                    {list.name}
                                </Link>

                            </li>
                        )}
                    </div>
                </ul>
            </section>
        </div>
    )
}

export default SetCard