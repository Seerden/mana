// import PassfailIcon from "components/_shared/PassfailIcon";
import { ReviewSession } from "graphql/codegen-output";
import { humanizedDateDifference, timeSince } from "helpers/time";
import React from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { ImClock } from "react-icons/im";
import TimePerCardChart from "./TimePerCardChart";

type SessionCardProps = {
    session: ReviewSession,
}

const SessionCard = ({ session }: SessionCardProps) => {
    const { n, direction } = session.settings;
    const DirectionIcon = direction === 'forwards' ? BiArrowToRight : BiArrowToLeft;
    const termCount = session.terms.termIds.length;
    // const icons = session.passfail.map(
    //     (passfail: string, index: number) => <PassfailIcon key={Math.random()} passfail={passfail} index={index} size={15} />
    // );
    const durationString = humanizedDateDifference(session.date.end, session.date.start);

    return (
        <div className="UserSessions__session">
            <div className="UserSessions__session--grid">
                <section className="UserSessions__session--meta">
                    <section className="UserSessions__date">
                        <header className="UserSessions__date--header">
                            When?
                            </header>


                        <div className="UserSessions__date--info">
                            <span className="UserSessions__date--info-line">
                                <ImClock className="UserSessions__date--info-icon" /> ... ended {timeSince(session.date.end)}
                            </span>

                            <span className="UserSessions__date--info-line">
                                <ImClock className="UserSessions__date--info-icon" />
                                    ... lasted about {durationString}
                            </span>
                        </div>

                    </section>

                    <section className="UserSessions__stats">
                        <header className="UserSessions__stats--header">
                            Stats
                            </header>

                        <div className="UserSessions__stats--stats">

                            <span className="UserSessions__stats--stat">
                                <span className="UserSessions__stats--stat-label">
                                    Cycles
                                    </span>

                                {n}
                            </span>

                            <span className="UserSessions__stats--stat">
                                <span className="UserSessions__stats--stat-label">
                                    Terms
                                    </span>

                                {termCount}
                            </span>

                            <span className="UserSessions__stats--stat">
                                <span className="UserSessions__stats--stat-label">
                                    Direction
                                    </span>

                                {direction} { }
                                    (<DirectionIcon className="UserSessions__direction" />)
                                </span>

                            {/* <span className="UserSessions__stats--stat">
                                    <span className="UserSessions__stats--stat-label">Pass/fail</span>
                                    {icons}
                                </span> */}
                        </div>
                    </section>
                </section>
                <TimePerCardChart
                    timePerCard={session.timePerCard}
                    passfail={session.passfail as PassFail[]}
                    width={400}
                    height={200}
                    iconSize={2.5}
                />
            </div>

        </div>
    )
}

export default SessionCard