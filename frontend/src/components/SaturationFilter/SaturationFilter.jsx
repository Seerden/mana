import React, { useState, useEffect, memo } from "react";
import { colorMap, colorBySaturation } from "helpers/list.api";
import SaturationIcon from './SaturationIcon';
import './style/SaturationFilter.scss';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'

const SaturationFilter = memo(({ filter, setFilter }) => {
    const [saturationFilter, setSaturationFilter] = useState({level: null, direction: 'any'});
    const [filterDisplayState, setFilterDisplayState] = useState('initial');

    useEffect(() => {
        setFilter(cur => ({ ...cur, saturation: saturationFilter }))
    }, [saturationFilter, setFilter])

    useEffect(() => {
        console.log(saturationFilter);
    }, [saturationFilter])

    const handleIconClick = (level) => {
        setSaturationFilter(cur => ({...cur, level}));
        setFilterDisplayState('direction')
    };

    const handleDirectionIconClick = (direction) => {
        setSaturationFilter(cur => ({...cur, direction}));
        setFilterDisplayState('initial');
    };

    function makeIcons() {
        let icons = Object.keys(colorMap)
            .map(level => {
                return (
                    <React.Fragment key={`saturation-wrapper-${level}`}>
                        <div
                            onClick={() => { handleIconClick(level) }}
                            className="SaturationFilter__icon--wrapper"
                        >
                            <SaturationIcon
                                classes="SaturationFilter__icon"
                                key={`saturation-filter-level-${level}`}
                                saturation={level}
                            />
                        </div>
                    </React.Fragment>
                )
            })
        return icons;
    }

    let icons = makeIcons();

    const directionButtons = ['forwards', 'backwards', 'any'].map(direction => {
        return (
            <button
                className="SaturationFilter__direction--button"
                key={`saturation-filter-${direction}`}
                value={direction}
                onClick={() => handleDirectionIconClick(direction)}
            >
                <span>{direction}</span>

                { direction !== 'any' && <span>{direction === 'forwards' ? <BiArrowToRight/> : <BiArrowToLeft/>}</span> }
            </button>
        )
    })

    return (
        <>
            <div
                className="SaturationFilter"
            >
                {filterDisplayState === 'initial' &&
                    <>
                        <button
                            onClick={() => setFilterDisplayState('level')}
                            className="SaturationFilter__label"
                            style={{
                                boxShadow: `0 8px 0 -7px ${saturationFilter ? colorBySaturation(saturationFilter) : '#333'}, 0 0 1rem black`,
                                border: `2px solid ${saturationFilter ? colorBySaturation(saturationFilter) : '#333'}`,
                            }}
                        >
                            Filter by saturation level
                            <input type="button"
                                value="Reset"
                                className="SaturationFilter__reset"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSaturationFilter({level: null, direction: 'any'});
                                }}

                            />
                        </button>
                    </>

                }

                {filterDisplayState === 'level' &&
                    <div className="SaturationFilter__filter">
                        <div
                            className="SaturationFilter__icons"
                            style={{ border: `2px solid ${saturationFilter ? colorBySaturation(saturationFilter) : '#333'}` }}
                        >
                            {icons}

                        </div>

                    </div>
                }

                {filterDisplayState === 'direction' && 
                    <div className="SaturationFilter__filter">
                        <div className="SaturationFilter__direction">
                            {directionButtons}
                        </div>                        
                    </div>
                
                }
            </div>
        </>
    )
})

export default SaturationFilter