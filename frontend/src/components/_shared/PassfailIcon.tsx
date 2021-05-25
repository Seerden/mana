import React from 'react';

type PassfailIconProps = {
    passfail: string,
    index: number,
    size?: number

}

const PassfailIcon = ({ passfail, index, size=20 }: PassfailIconProps) => {
    return (
        <>
            <span
                key={`passfail-${passfail}-${index}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    display: "inline-block",
                    margin: "0.2rem",
                    borderRadius: "50%",
                    backgroundColor: passfail === 'pass' ? 'seagreen' : 'orangered'
                }}
            />
        </>
    )
}

export default PassfailIcon