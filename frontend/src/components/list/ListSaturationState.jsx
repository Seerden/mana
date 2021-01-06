import React from "react";
import { colorMap, colorBySaturation } from "helpers/list.api";
import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import { countDict } from "helpers/count";
import './style/ListSaturationState.scss';

const ListSaturationState = ({ terms }) => {
    const icons = Object.keys(colorMap).map((level, idx) => {
        return (
            <SaturationIcon
                key={`saturation-icon-${idx}`}
                style={{ display: 'inline-block', width: '20px', height: '20px' }}
                saturation={level}
            />
        )
    })

    let termCountPerLevel = getTermCountPerLevel(terms);
    let progress = getProgress(termCountPerLevel);
    let overviewElements = makeSaturationOverviewElements(termCountPerLevel)

    function getTermCountPerLevel(terms) {
        const occurrences = {};

        ['forwards', 'backwards'].map(direction => {
            occurrences[direction] = countDict(terms.map(t => t.saturation[direction]))

            return null;
        })

        return occurrences;

    }

    function getProgress(occurrences) {
        let progress = {};

        ['forwards', 'backwards'].forEach(direction => {
            progress[direction] = Math.floor(100 * Object.entries(occurrences[direction]).reduce((acc, [key, val]) => {
                if (+key > 2) {
                    return acc + +val;
                } return +acc;
            }, 0) / (terms.length));
        });

        return progress;
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