import React, { memo, useContext, useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import { ReviewContext } from '../../context/ReviewContext';
import './style/PreReview.scss';

const PreReview = (props) => {
    const { reviewContext, setReviewContext } = useContext(ReviewContext),
        { settings } = reviewContext,
        [buttons, setButtons] = useState(null),
        [directionButtons, setDirectionButtons] = useState(null);

    useEffect(() => {
        setButtons([1, 2, 3, 4, 5].map(num => <SettingsButton key={uuidv4()} value={num} n={settings.n} handleSettingsChange={handleSettingsChange} />))
        setDirectionButtons(['forwards', 'backwards'].map(d => <SettingsButton key={uuidv4()} value={d} current={settings.direction} direction={d} handleSettingsChange={handleSettingsChange}/>))
    }, [settings])

    const handleSettingsChange = e => {
        setReviewContext({ ...reviewContext, settings: { ...reviewContext.settings, [e.target.name]: e.currentTarget.value } })  // todo: only set context if value is different
    }

    return (
        <>
            <div className="PreReview">
                <div className="PreReview__header PageHeader">
                    Review settings
                </div>

                <form className="PreReview__settings">
                    <ul className="PreReview__settings--list">
                        <li key={uuidv4()}>
                            <label className="PreReview__settings--label" htmlFor="n">
                                Number of cycles:
                            </label>
                            <p className="PreReview__settings--tip">
                                This is the number of times you need to get each term right to complete the session
                            </p>
                            <div className="PreReview__settings--cycles">
                                {buttons}
                            </div>
                        </li>

                        <li key={uuidv4()}>
                            <label className="PreReview__settings--label" htmlFor="direction">
                                Direction:
                            </label>
                            <p className="PreReview__settings--tip">
                                'Forwards' means you're shown the term in the original language, and need to recall the meaning in the secondary language. 'Backwards' is the other way around.
                            </p>
                            <div className="PreReview__settings--directionbuttons">
                                { directionButtons }
                            </div>
                        </li>
                    </ul>

                    <input 
                        onClick={() => setReviewContext({...reviewContext, settings: {...reviewContext.settings, started: true}})}
                        id="PreReview__start" 
                        type="button" 
                        value="Start the review with these settings"
                    />
                </form>
            </div>
        </>
    )
}

export default PreReview

const SettingsButton = memo(({ handleSettingsChange, direction, n, value, current }) => {
    let selected;
    if (n) {
        selected = String(n) === String(value)
    } else if (direction) {
        selected = direction === current;
    }
    return (
        <input
            style={{ 
                color: selected ? 'white' : 'black', 
                backgroundColor: selected ? 'blueviolet' : 'white',
            }}
            onClick={handleSettingsChange}
            className={n ? `PreReview__settings--n` : 'PreReview__settings--direction'}
            name={n ? "n" : "direction"}
            type="button"
            value={value} />
    )
})