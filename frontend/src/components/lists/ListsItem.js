import React, { memo, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './css/ListsItem.scss'
import { timeSince } from '../../helpers/time';

const ListsItem = memo(({ list }) => {
    const { params } = useRouteProps();

    return (
        <div className="ListsItem">
            <div className="ListsItem__name">
                <Link className="ListsItem__name--link" to={`/u/${params.username}/list/${list._id}`} >
                    {list.name}
                </Link>
            </div>
            <div className="ListsItem__from">{list.from}</div>
            <div className="ListsItem__to">{list.to}</div>
        { list.sessions.length > 0 && 
            <div className="ListsItem__since">
                <em>Reviewed {timeSince(list.sessions[list.sessions.length-1].end)}</em>
            </div> 
        }
        </div>
    )
})

export default ListsItem