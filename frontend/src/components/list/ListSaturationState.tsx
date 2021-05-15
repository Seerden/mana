import React from "react";
import { colorMap } from "helpers/list.api";
import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import { countDict } from "helpers/count";
import './style/ListSaturationState.scss';
import { Term } from "graphql/codegen-output";

type OccurrenceInterface = {
    [K in 'forwards' | 'backwards']: {[key: string]: number}
}

const ListSaturationState = ({ terms }) => {
    const icons = Object.keys(colorMap).map((idx, level) => {
        return (
            <SaturationIcon
                key={`saturation-icon-${idx}`}
                style={{ display: 'inline-block', width: '20px', height: '20px' }}
                saturation={level}
            />
        )
    })

    let termCountPerLevel = getTermCountPerLevel(terms);
    let overviewElements = makeSaturationOverviewElements(termCountPerLevel)

    function getTermCountPerLevel(terms: Term[]) {
        const occurrences: OccurrenceInterface | {} = {};

        ['forwards', 'backwards'].map(direction => {
            occurrences[direction] = countDict(terms.map(t => t.saturation[direction]))

            return null;
        })

        return occurrences;

    }

    function makeSaturationOverviewElements(termCounts) {
        return Object.keys(colorMap).map(i => {
            if (termCounts.forwards[i] || termCounts.backwards[i]) {
                return (
                    <tr
                        key={`saturation-overview-${i}`}
                    >
                        <td>{icons[i]}</td>
                        <td>{termCounts.forwards[i] || 0}</td>
                        <td>{termCounts.backwards[i] || 0}</td>
                    </tr>
                );
            }
            return null;
        });
    }

    return (
        <div className="ListSaturationState">
            <table className="ListSaturationState__table">
                <thead>
                    <tr>
                        <th>level</th>
                        <th>forwards</th>
                        <th>backwards</th>
                    </tr>
                </thead>
                <tbody>
                    {overviewElements}
                </tbody>
            </table>
        </div>
    )
}

export default ListSaturationState