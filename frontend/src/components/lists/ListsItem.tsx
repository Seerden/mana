import React, { memo } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './style/ListsItem.scss';
import { BiArrowToRight } from "react-icons/bi";
import { colorByLastReviewDate } from './lists.helpers'
import { timeSince } from "helpers/time";
import { List } from "graphql/codegen-output";

const ListsItem = memo(({ list }: { list: List}) => {
    const { params } = useRouteProps();
    const numTerms = list.terms.length;
    const listHasSessions = list.sessions && list.sessions.length > 0;
    const lastReviewDate = list.sessions && listHasSessions ? list.sessions[list.sessions.length-1].date.end : null;
    const timeAgo = listHasSessions && timeSince(lastReviewDate);
    const borderColor = colorByLastReviewDate(lastReviewDate);

    return (
        <div style={{ borderColor }} className="ListsItem">
            <div className="ListsItem__name">
                <Link className="Link" to={`/u/${params.username}/list/${list._id}`}>{list.name}</Link>
            </div>

            <div className="ListsItem__numTerms">{numTerms} terms</div>

            <div className="ListsItem__languages">{list.from} <BiArrowToRight /> {list.to} </div>

            { listHasSessions &&
                <div className="ListsItem__since">
                    <em>last reviewed {timeAgo}</em>
                </div>
            }

        </div>
    )
})

export default ListsItem