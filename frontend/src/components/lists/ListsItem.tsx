import React, { memo } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './style/ListsItem.scss';
import { timeSince } from '../../helpers/time';
import { BiArrowToRight } from "react-icons/bi";
import { colorByLastReviewDate, getTimeSinceLastReview } from './lists.helpers'

const ListsItem = memo(({ list }: { list: List}) => {
    const { params } = useRouteProps();
    const numTerms = list.terms.length;
    const { from, to } = list;
    const latestSessionEndDate = list.sessions[list.sessions.length - 1].date.end;
    const timeSinceLastSession = timeSince(latestSessionEndDate);

    return (
        <div style={{ borderColor: colorByLastReviewDate(getTimeSinceLastReview(list)) }} className="ListsItem">
            <div className="ListsItem__name">
                <Link className="Link" to={`/u/${params.username}/list/${list._id}`}>{list.name}</Link>
            </div>

            <div className="ListsItem__numTerms">{numTerms} terms</div>

            <div className="ListsItem__languages">{from} <BiArrowToRight /> {to} </div>

            { list.sessions.length > 0 &&
                <div className="ListsItem__since">
                    <em>last reviewed {timeSinceLastSession}</em>
                </div>
            }

        </div>
    )
})

export default ListsItem