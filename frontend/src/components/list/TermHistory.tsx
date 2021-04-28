import React, { useState, memo, Fragment } from "react";
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { timeSince } from '../../helpers/time';
import './style/TermHistory.scss'

const TermHistory = memo(({ history }: { history: any[]}) => {
    const [expand, setExpand] = useState(false);

    const histEl = makeHistoryElement(history);

    function makeHistoryElement(history) {
        return history.map(el =>
        (
            <Fragment key={uuidv4()}>
                <div className="TermHistory__session">
                    <div className="TermHistory__session--block">
                        <span className="TermHistory__direction">
                            {el.direction === 'forwards'
                                ? 
                                    <BiArrowToRight 
                                        title="Reviewed front to back"
                                        fill="deepskyblue"
                                        size={18}
                                    />
                                : 
                                    <BiArrowToLeft 
                                        title="Reviewed back to front"
                                        fill="limegreen" 
                                        size={18}
                                    />
                            }
                        </span>

                        <span
                            title={dayjs(el.date).format('MMMM DD, YYYY (HH:mm)')}
                            className="TermHistory__date"
                        >
                            {timeSince(el.date)}
                        </span>
                    </div>

                    <div className="TermHistory__session--block">
                        <div
                            key={uuidv4()}
                            className="TermHistory__history">
                            {el.content.map((i, index) =>
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
                                />
                            )
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        )
    }

    return (
        <>
            <div className="TermHistory">
                <div className="TermHistory__header">
                    <div
                        className="TermHistory__desc">
                        You've reviewed this term {histEl.length} time{histEl.length === 1 ? '' : 's'}
                    </div>
                    {histEl.length > 1 &&
                        <button
                            className="TermHistory__expand"
                            onClick={() => setExpand(!expand)}
                        >
                            {!expand ? 'Showing one' : 'Showing all'}
                        </button>
                    }
                </div>
                <div className="TermHistory__content">
                    {expand ? histEl.reverse() : histEl.reverse()[0]}
                </div>
            </div>
        </>
    )
})

export default TermHistory