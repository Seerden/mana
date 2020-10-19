import React, { memo, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './css/ListsItem.scss'

const ListsItem = memo(({ list }) => {
    const { params } = useRouteProps();
    const [expanded, setExpanded] = useState(false);
    return (
        <div className="ListsItem">
            <div className="ListsItem__name">
                <Link className="ListsItem__name--link" to={`/u/${params.username}/list/${list._id}`} >
                    {list.name}
                </Link>
            </div>
            <div className="ListsItem__from">{list.from}</div>
            <div className="ListsItem__to">{list.to}</div>
        </div>
    )
})

export default ListsItem