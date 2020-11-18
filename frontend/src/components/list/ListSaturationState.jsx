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

    function saturationOccurrence() {
        const occurrences = {};

        ['forwards', 'backwards'].map(direction => {
            occurrences[direction] = countDict(terms.map(t => t.saturation[direction]))
        })

        return occurrences;

    }

    const saturationOverviewElements = () => {
        let occurrences = saturationOccurrence();

        return Object.keys(colorMap).map(i => {
            if (i) {
                return (
                    <tr
                        key={`saturation-overview-${i}`}
                    >
                        <td>{icons[i]}</td>
                        <td>{occurrences.forwards[i] || 0}</td>
                        <td>{occurrences.backwards[i] || 0}</td>
                    </tr>
                )

            }
        })
    }

    return (
        <div className="ListSaturationState">
            <table className="ListSaturationState__table">
                <tr>
                    <th>level</th>
                    <th># forwards</th>
                    <th># backwards</th>
                </tr>
            {saturationOverviewElements()}
            </table>
        </div>
    )
}

export default ListSaturationState