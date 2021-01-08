import React, { memo } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from "../../hooks/routerHooks";
import './style/ListsItem.scss'
import { timeSince } from '../../helpers/time';
import dayjs from 'dayjs';
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";

const ListsItem = memo(({ list }) => {
    const { params } = useRouteProps();

    function timeSinceLastReview(list) {
        if (!list.lastReviewed) { return null; }

        return dayjs(new Date()) - dayjs(list.lastReviewed);
    }

    function colorByLastReviewDate(timeSince) {
        let day = 3600 * 24 * 1000;
        if (!timeSince) {
            return '#333';
        } if (timeSince < day) {
            return 'seagreen';
        } if (timeSince < 2 * day) {
            return 'teal';
        } if (timeSince < 3 * day) {
            return 'yellowgreen';
        } if (timeSince < 7 * day) {
            return 'orange';
        }
        return 'orangered';
    }

    return (
        <div style={{ borderColor: colorByLastReviewDate(timeSinceLastReview(list)) }} className="ListsItem">
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

            <div>
                {['forwards', 'backwards'].map(direction => <StateRectangle size={15} direction={direction} state={list.state[direction]} />)}
            </div>
        </div>
    )
})

export default ListsItem

function getfillColor(state) {
    switch(state) {
        case 'untouched':
            return 'red'
        case 'seeding':
            return 'yellow'
        case 'seeded':
            return 'seagreen'
        default:
            return 'black'
    }
}

function StateRectangle({size, direction, state}) {
    let fillColor = getfillColor(state);

    return (
        <svg 
            width={size} 
            height={size}
            style={{marginLeft: direction === 'backwards' ? '0.4rem' : '0'}}
        >
            <rect 
                width={size} 
                height={size} 
                fill={fillColor}
            >
                <title> {direction} seeding state</title>
            </rect>
        </svg>
    )
}