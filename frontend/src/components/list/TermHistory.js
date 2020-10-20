import React, { useState, useEffect, memo } from "react";
import './css/TermHistory.scss'
import dayjs from 'dayjs';

const TermHistory = memo(({ visible, history }) => {
    const [expand, setExpand] = useState(false);

    const histEl = makeHistoryElement(history.reverse());

    function makeHistoryElement(history) {
        return history.map(el => {
            return (
                <>
                    <div className="TermHistory__session">
                        <div className="TermHistory__date">{dayjs(el.date).format('MMMM DD, HH:mm')}</div>
                        <div className="TermHistory__history">
                            {el.content.map(i => <span className={`TermHistory__passfail ${i === 'pass' ? 'pass' : 'fail'}`}>{i}</span>)}
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
                        <div className="TermHistry__header--desc">You've reviewed this term {histEl.length} time{histEl.length > 1 ? 's' : ''}</div>
                        <button className="TermHistory__header--button" onClick={() => setExpand(!expand)}>{!expand ? 'Expand history' : 'Collapse history'}</button>
                    </div>
                    {expand ? histEl : histEl[0]}
                </div>
            }
        </>
    )
})

export default TermHistory