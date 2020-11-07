import React, { useState, useEffect } from "react";
import { colorMap, colorBySaturation } from "../../helpers/list.api";
import SaturationIcon from './SaturationIcon';
import './style/SaturationFilter.scss';

const SaturationFilter = ({filter, setFilter}) => {
    const [saturationFilter, setSaturationFilter] = useState(null);
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        if (saturationFilter) {
            setFilter(({...filter, saturation: saturationFilter}))
        }
    }, [saturationFilter, setFilter])

    let icons = Object.keys(colorMap)
        .map(level => {
            return (
                <div
                    onClick={() => {
                        setSaturationFilter(level);
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
                {!focus
                    ?
                    <button
                        onClick={() => setFocus(true)}
                        className="SaturationFilter__label"
                        style={{
                            boxShadow: `0 8px 0 -7px ${saturationFilter ? colorBySaturation(saturationFilter) : '#333'}, 0 0 1rem black`,
                            border: `2px solid ${saturationFilter ? colorBySaturation(saturationFilter) : '#333'}`,
                        }}
                    >
                        Filter by saturation level
                        </button>
                    :
                    <div className="SaturationFilter__filter">
                        <div
                            className="SaturationFilter__icons"
                            style={{ border: `2px solid ${saturationFilter ? colorBySaturation(saturationFilter) : '#333'}` }}
                        >
                            {icons}
                        </div>
                        
                        {/* ----- WIP: implement filter by direction ----- */}
                        {/* <div 
                            style={{ 
                                border: `2px solid ${filter ? colorBySaturation(filter) : '#333'}`,
                                borderTop: 'none',
                            }}
                            className="SaturationFilter__options"
                        >
                            <div className="SaturationFilter__options--block">
                                <label 
                                    className="SaturationFilter__options--label"
                                    htmlFor="direction"
                                >
                                    Direction
                                </label>
                                <select className="SaturationFilter__options--select">
                                    <option 
                                        className="SaturationFilter__options--option"
                                        value="forwards">forwards</option>
                                    <option 
                                        className="SaturationFilter__options--option"
                                        value="backwards">backwards</option>
                                </select>
                            </div>
                        </div> */}

                    </div>
                }


            </div>
        </>
    )
}

export default SaturationFilter