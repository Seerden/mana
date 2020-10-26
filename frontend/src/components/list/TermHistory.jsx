import React, { useState, useEffect, memo, Fragment } from "react";
import './TermHistory.css'
import dayjs from 'dayjs';
import { timeSince } from '../../helpers/time';
import { v4 as uuidv4 } from 'uuid';

const TermHistory = memo(({ visible, history }) => {
    const [expand, setExpand] = useState(false);

    const histEl = makeHistoryElement(history);

    function makeHistoryElement(history) {
        return history.map(el =>
        (
            <Fragment key={uuidv4()}>
                <div className="TermHistory__session">
                    <div title={dayjs(el.date).format('MMMM DD, YYYY (HH:mm)')} className="TermHistory__date">
                        {timeSince(el.date)}
                    </div>
                    <div key={uuidv4()} className="TermHistory__history">
                        {
                            el.content.map((i, index) =>
                                <span
                                    key={`passfail-${i}-${index}`}
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        display: "inline-block",
                                        margin: "0.2rem",
                                        borderRadius: "50%",
                                        backgroundColor: i === 'pass' ? 'seagreen' : 'orangered'
                                    }}
                                > </span>
                            )
                        }
                    </div>
                </div>
            </Fragment>
        )
        )
    }

    return (
        <>
            { visible &&
                <div className="TermHistory">
                    <div className="TermHistory__header">
                        <div
                            className="TermHistory__header--desc">
                            You've reviewed this term {histEl.length} time{histEl.length === 1 ? '' : 's'}
                        </div>
                        {histEl.length > 1 &&
                            <button
                                className="TermHistory__header--button"
                                onClick={() => setExpand(!expand)}
                            >
                                {!expand ? 'Expand history' : 'Collapse history'}
                            </button>
                        }
                    </div>
                    {expand ? histEl.reverse() : histEl[histEl.length - 1]}
                </div>
            }
        </>
    )
})

export default TermHistory