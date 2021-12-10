import PassfailIcon from "components/_shared/PassfailIcon";
import dayjs from "dayjs";
import { timeSince } from "helpers/time";
import { Fragment } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

export function makeHistoryElement(history) {
    return history.map((el) => (
        <Fragment key={uuidv4()}>
            <div className="TermHistory__session">
                <div className="TermHistory__session--block">
                    <span className="TermHistory__direction">
                        {el.direction === "forwards" ? (
                            <BiArrowToRight
                                title="Reviewed front to back"
                                fill="deepskyblue"
                                size={18}
                            />
                        ) : (
                            <BiArrowToLeft
                                title="Reviewed back to front"
                                fill="limegreen"
                                size={18}
                            />
                        )}
                    </span>

                    <span
                        title={dayjs(el.date).format("MMMM DD, YYYY (HH:mm)")}
                        className="TermHistory__date"
                    >
                        {timeSince(el.date)}
                    </span>
                </div>

                <div className="TermHistory__session--block">
                    <div key={uuidv4()} className="TermHistory__history">
                        {el.content.map((passfail, index) => (
                            <PassfailIcon
                                key={`passfailicon-${index}`}
                                {...{ passfail, index }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    ));
}
