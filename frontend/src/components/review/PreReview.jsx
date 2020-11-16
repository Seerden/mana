import { useLogState } from "hooks/state";
import React, { memo, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { reviewSettingsState, reviewStageState } from "recoil/atoms/reviewAtoms";
import { v4 as uuidv4 } from 'uuid';
import './style/PreReview.scss';

const PreReview = (props) => {
    const 
        [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState),
        setReviewStage = useSetRecoilState(reviewStageState),
        buttons = useMemo(() =>
            [1, 2, 3, 4, 5]
                .map(num => <SettingsButton
                    key={uuidv4()}
                    value={num}
                    n={reviewSettings.n}
                    handleSettingsChange={handleSettingsChange}
                />
                )
            , [reviewSettings.n]),
        directionButtons = useMemo(() =>
            ['forwards', 'backwards']
                .map(d => <SettingsButton
                    key={uuidv4()}
                    value={d}
                    current={reviewSettings.direction}
                    direction={d}
                    handleSettingsChange={handleSettingsChange}
                />
                ), [reviewSettings.direction])

    function handleSettingsChange(e) {
        const val = e.currentTarget.value;
        let newVal = (isNaN(Number(val)) && val) || Number(val);
        setReviewSettings(current => ({ ...current, [e.target.name]: newVal }));
    }

    return (
        <>
            <div className="PreReview">
                <div className="PreReview__header PageHeader">
                    Review settings
                </div>

                <form className="PreReview__settings">
                    <ul className="PreReview__settings--list">
                        <li key='review-cycles'>
                            <label className="PreReview__settings--label" htmlFor="n">
                                Number of cycles:
                            </label>
                            <p className="PreReview__settings--tip">
                                This is the number of times you need to get each term right to complete the session.
                            </p>
                            <div className="PreReview__settings--cycles">
                                {buttons}
                            </div>
                        </li>

                        <li key='review-direction'>
                            <label className="PreReview__settings--label" htmlFor="direction">
                                Direction:
                            </label>
                            <div className="PreReview__settings--tip">
                                <div>
                                    'Forwards' means you're shown the front, and need to recall the back of the card.
                                </div>
                                <div>
                                    'Backwards' is the other way around.
                                </div>
                            </div>
                            <div className="PreReview__settings--directionbuttons">
                                {directionButtons}
                            </div>
                        </li>
                    </ul>

                    <input
                        onClick={() => {
                            setReviewSettings(current => ({ ...current, sessionStart: new Date(), started: true }));
                            setReviewStage('started');
                        }}
                        className="PreReview__start"
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