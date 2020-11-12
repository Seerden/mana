import React, { useState } from "react";
import './style/SetCard.scss'
import { Link } from 'react-router-dom'
import { useRouteProps } from "hooks/routerHooks";
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const SetCard = ({ set }) => {
    const { params } = useRouteProps();
    const { name, description, lists } = set;
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="SetCard">
            <header onClick={() => setExpanded(expanded => !expanded)} className="SetCard__header">
                <span>{name}</span>
                <span>
                    {expanded
                        ?
                        <MdExpandLess
                            className="arrow"
                        />
                        :
                        <MdExpandMore
                            className="arrow"
                        />
                    }
                </span>

            </header>

            {expanded &&
                <div className="slidedown"> 
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
            }
        </div>
    )
}

export default SetCard