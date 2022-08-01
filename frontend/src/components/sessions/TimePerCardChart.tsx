import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { extent, max } from "d3-array";
import "./TimePerCard.scss";

type TimePerCardDatum = {
    cardIndex: number;
    timeOnCard: number;
};

function makeTimeIndexTuple(timePerCard: number[]) {
    return timePerCard.map((entry, index) => ({
        cardIndex: index,
        timeOnCard: 0.1 * Math.floor(entry / 100), // time is in ms, round down to nearest .1s
    }));
}

const getX = (d: TimePerCardDatum) => d.cardIndex;
const getY = (d: TimePerCardDatum) => d.timeOnCard;

type ChartProps = {
    timePerCard: number[];
    passfail: Array<"pass" | "fail">;
    width?: number;
    height?: number;
    margin?: {
        x: number;
        y: number;
    };
    iconSize?: number;
};

const labelProps = {
    fill: "red",
    color: "red",
    stroke: "red",
    strokeWidth: 2,
    strokeOpacity: 0.5,
};

const TimePerCardChart = ({
    timePerCard,
    passfail,
    width = 350,
    height = 150,
    margin = { x: 20, y: 25 },
    iconSize = 2,
}: ChartProps) => {
    const data = makeTimeIndexTuple(timePerCard);

    const xScale =
        data &&
        scaleLinear<number>({
            domain: extent(data, getX) as [number, number],
            range: [1.5 * margin.x, width + margin.x / 2],
        });

    const yScale =
        data &&
        scaleLinear<number>({
            domain: [0, max(data, getY)] as [number, number],
            range: [height + margin.y, margin.y],
        });

    return (
        <>
            {data && xScale && yScale && (
                <section className="TimePerCard">
                    <div className="TimePerCard__header">Time per card [seconds]</div>
                    <svg
                        className="TimePerCard__svg"
                        width={width + 2 * margin.x}
                        height={height + margin.y}
                    >
                        <Group top={-margin.y} left={0}>
                            <rect
                                x={margin.x * 1.5}
                                y={margin.y}
                                width={width - margin.x}
                                height={height}
                                fill="#333"
                                fillOpacity={0.6}
                            />
                            {data &&
                                data.map((d, i) => (
                                    <circle
                                        key={`circle-${i}`}
                                        r={iconSize}
                                        cx={xScale(getX(d))}
                                        cy={yScale(getY(d))}
                                        fill={
                                            passfail[i] === "pass"
                                                ? "seagreen"
                                                : "orangered"
                                        }
                                    />
                                ))}

                            <AxisBottom
                                scale={xScale}
                                top={height + margin.y}
                                stroke="#555"
                                tickStroke={"#555"}
                                {...{ labelProps }}
                                tickLabelProps={() => ({
                                    fill: "white",
                                    fontSize: 11,
                                    strokeOpacity: 1,
                                    textAnchor: "middle",
                                })}
                                numTicks={data.length / 10}
                            />

                            <AxisLeft
                                scale={yScale}
                                left={margin.x * 1.5}
                                stroke="#555"
                                tickStroke="#555"
                                labelProps={{ ...labelProps, textAnchor: "middle" }}
                                tickLabelProps={() => ({
                                    fill: "#ccc",
                                    fontSize: 11,
                                    color: "white",
                                    strokeOpacity: 1,
                                    textAnchor: "end",
                                    x: -15,
                                })}
                                numTicks={5}
                            />
                        </Group>
                    </svg>
                </section>
            )}
        </>
    );
};

export default TimePerCardChart;
