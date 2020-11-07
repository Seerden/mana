import React, { useState, useEffect } from "react";
import { colorMap, colorBySaturation } from "../../helpers/list.api";
import SaturationIcon from './SaturationIcon';
import './style/SaturationFilter.scss';

const SaturationFilter = (props) => {
    const [filter, setFilter] = useState(null);
    const [focus, setFocus] = useState(false);

    let icons = Object.keys(colorMap)
        .map(level => {
            return (
                <div
                    onClick={() => {
                        setFilter(level);
                        setTimeout(() => { setFocus(false) }, 0);                         
                    }}
                    className="SaturationFilter__icon--wrapper"
                >
                    <SaturationIcon
                        classes="SaturationFilter__icon"
                        key={`saturation-filter-level-${level}`}
                        saturation={level}
                    />
                </div>
            )
        }
        )

    return (
        <>
            <div
                className="SaturationFilter"
            >
                { !focus 
                    ? 
                        <button
                            onClick={() => setFocus(true)}
                            className="SaturationFilter__label"
                            style={{
                                // backgroundColor: filter ? colorBySaturation(filter) : '',
                                boxShadow: `0 12px 0 -9px ${filter ? colorBySaturation(filter) : 'white'}, 0 0 1rem black`,
                                border: `2px solid ${filter ? colorBySaturation(filter) : 'white'}`,
                            }}
                        >
                            Filter by saturation level
                        </button>
                    :
                        <div 
                            className="SaturationFilter__icons"
                            style={{ border: `3px solid ${filter ? colorBySaturation(filter) : '#333'}` }}
                        >
                            {icons}
                        </div>
            }


            </div>
        </>
    )
}

export default SaturationFilter