import React, { memo } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './style/ListsItem.scss';
import { timeSince } from '../../helpers/time';
import { BiArrowToRight } from "react-icons/bi";
import { colorByLastReviewDate, getTimeSinceLastReview } from './lists.helpers'
import { ListsItemProps } from './lists.types';

const ListsItem = memo(({ list }: ListsItemProps) => {
    const { params } = useRouteProps();

    return (
        <div style={{ borderColor: colorByLastReviewDate(getTimeSinceLastReview(list)) }} className="ListsItem">
            <div className="ListsItem__name">
                <Link className="Link" to={`/u/${params.username}/list/${list._id}`}>{list.name}</Link>
            </div>

            <div className="ListsItem__numTerms">{list.terms.length} terms</div>

            <div className="ListsItem__languages">{list.from} <BiArrowToRight /> {list.to} </div>

            { list.sessions.length > 0 &&
                <div className="ListsItem__since">
                    <em>last reviewed {timeSince(list.sessions[list.sessions.length - 1].end)}</em>
                </div>
            }

        </div>
    )
})

export default ListsItem