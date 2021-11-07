import { useLogState } from "hooks/state";
import React, { memo, useEffect, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { reviewSettingsState, reviewStageState } from "state/atoms/reviewAtoms";
import { v4 as uuidv4 } from 'uuid';
import './style/PreReview.scss';

type SettingsButtonProps = {
    handleSettingsChange: (e?: any) => void,
    direction?: Direction,
    n?: number | string,
    value: Direction | number,
    current?: Direction
}

const PreReview = (props) => {
    const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
    const setReviewStage = useSetRecoilState(reviewStageState);

    const buttons = useMemo(() => {
        return [1, 2, 3, 4, 5]
            .map((num: number) => <SettingsButton
                key={uuidv4()}
                value={num}
                n={reviewSettings.n}
                handleSettingsChange={handleSettingsChange}
            />)
    }, [reviewSettings.n]);
    
    const directionButtons = useMemo(() => {
        return (['forwards', 'backwards'] as Direction[])
            .map((d) => <SettingsButton
                key={uuidv4()}
                value={d}
                current={reviewSettings.direction}
                direction={d}
                handleSettingsChange={handleSettingsChange}
            />)
    }, [reviewSettings.direction])

    function handleSettingsChange(e) {
        const val = e.currentTarget.value;
        let newVal = (isNaN(Number(val)) && val) || Number(val);
        setReviewSettings(current => ({ ...current, [e.target.name]: newVal }));
    };

    function handleReviewStartClick() {
        setReviewSettings(current => ({ ...current, sessionStart: new Date(), started: true }));
        setReviewStage('started');
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
                        onClick={handleReviewStartClick}
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

const SettingsButton = memo(({ handleSettingsChange, direction, n, value, current }: SettingsButtonProps) => {
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
                padding: '0.1rem 0.5rem'
            }}
            onClick={handleSettingsChange}
            className={n ? `PreReview__settings--n` : 'PreReview__settings--direction'}
            name={n ? "n" : "direction"}
            type="button"
            value={value} />
    )
})