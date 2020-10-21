import React, { useState, useEffect, memo } from "react";
import './css/TermHistory.css'
import dayjs from 'dayjs';
import { timeSince } from '../../helpers/time';

const TermHistory = memo(({ visible, history }) => {
    const [expand, setExpand] = useState(false);

    const histEl = makeHistoryElement(history);

    function makeHistoryElement(history) {
        return history.map(el => {
            return (
                <>
                    <div className="TermHistory__session">
                        <div title={dayjs(el.date).format('MMMM DD, YYYY (HH:mm)')} className="TermHistory__date">
                            {timeSince(el.date)}
                        </div>
                        <div className="TermHistory__history">
                            {el.content.map((i, idx) => <span key={`${i}-${idx}`} className={`TermHistory__passfail ${i === 'pass' ? 'pass' : 'fail'}`}>{i}</span>)}
                        </div>
                    </div>
                </>
            )
        })
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
                    {expand ? histEl.reverse() : histEl[histEl.length-1]}
                </div>
            }
        </>
    )
})

export default TermHistory