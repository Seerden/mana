import React from "react";
import { colorBySaturation } from '../../helpers/list.api';

const SaturationIcon = ({ direction, classes, saturation }) => {
    const saturationIconStyle = {
        width: '20px',
        height: '20px',
        padding: '0rem',
        borderRadius: '50%',
        backgroundColor: colorBySaturation(saturation) || '#333',
        boxShadow: "0 0 1rem black",
        border: "2px solid transparent",
    }

    function makeTooltip(direction, saturation) {
        if (!(typeof saturation) === 'Number') {
            return 'Not enough reviews to judge memorization. Get on it!';
        }
    
        if (saturation < 2) {
            return `${direction}: Review soon!`;
        }
    
        return `${direction}: No need to review yet`;
    }

    return (
        <span 
            title={direction ? makeTooltip(direction, saturation) : ''} 
            style={saturationIconStyle} 
            className={classes} 
        />
    )
}

export default SaturationIcon