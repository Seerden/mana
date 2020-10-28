import React, { memo, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './ListsItem.scss'
import { timeSince } from '../../helpers/time';
import dayjs from 'dayjs';

const ListsItem = memo(({ list }) => {
    const { params } = useRouteProps();

    const timeSinceLastReview = (list) => {
        if (!list.lastReviewed) { return null }

        return dayjs(new Date()) - dayjs(list.lastReviewed)
    }

    const colorByLastReviewDate = (timeSince) => {
        let day = 3600*24*1000
        if (!timeSince) {
            return '#333'
        } if (timeSince < day) {
            return 'seagreen'
        } if (timeSince < 2*day) {
            return 'teal'
        } if (timeSince < 3*day) {
            return 'yellowgreen'
        } if (timeSince < 7*day) {
            return 'orange'
        } 
        return 'orangered'
    }


    return (
        <div style={{borderColor: colorByLastReviewDate(timeSinceLastReview(list))}}className="ListsItem">
            <div className="ListsItem__name">
                <Link className="Link" to={`/u/${params.username}/list/${list._id}`}>{list.name}</Link>
            </div>
            <div className="ListsItem__from">{list.from}</div>
            <div className="ListsItem__to">{list.to}</div>
            <div className="ListsItem__numTerms">{list.numTerms} terms in this list</div>
        { list.sessions.length > 0 && 
            <div className="ListsItem__since">
                <em>last reviewed {timeSince(list.sessions[list.sessions.length-1].end)}</em>
            </div> 
        }
        </div>
    )
})

export default ListsItem