import React, { memo } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './style/ListsItem.scss';
import { BiArrowToRight } from "react-icons/bi";
import { colorByLastReviewDate, getTimeSinceLastReview } from './lists.helpers'

const ListsItem = memo(({ list }: { list: List}) => {
    const { params } = useRouteProps();
    const numTerms = list.terms.length;
    const { from, to } = list;
    const timeSinceLastSession = getTimeSinceLastReview(list);
    const borderColor = colorByLastReviewDate(timeSinceLastSession);
    const listHasSessions = list.sessions.length > 0;

    return (
        <div style={{ borderColor }} className="ListsItem">
            <div className="ListsItem__name">
                <Link className="Link" to={`/u/${params.username}/list/${list._id}`}>{list.name}</Link>
            </div>

            <div className="ListsItem__numTerms">{numTerms} terms</div>

            <div className="ListsItem__languages">{from} <BiArrowToRight /> {to} </div>

            { listHasSessions &&
                <div className="ListsItem__since">
                    <em>last reviewed {timeSinceLastSession}</em>
                </div>
            }

        </div>
    )
})

export default ListsItem