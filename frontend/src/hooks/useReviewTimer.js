import react, { useRef, useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { futureTermsState, timePerCardState, timerState } from 'recoil/atoms/reviewAtoms';
import { useLogState } from './state';

/**
 * Hook to help track time spent [ms] on each card. Resets whenever futureTerms changes
 * @note timePerCard is an atom, updated from useReview()
 */
export function useReviewTimer({ tick }) {
    const futureTerms = useRecoilValue(futureTermsState);
    const [timer, setTimer] = useRecoilState(timerState);
    const timerInterval = useRef();

    /**
     * Reset timer to 0 ms
     */
    function resetTimer() {
        setTimer(0)
    }

    useEffect(() => {  // create timer update interval (dt = tick) on mount, and remove on unmount
        timerInterval.current = setInterval(() => {
            setTimer(cur => cur + tick)
        }, tick)

        return () => clearInterval(timerInterval.current)
    }, [])

    useEffect(() => {  // reset timer when futureTerms changes, i.e. when the user moves to the next card in the review
        resetTimer();
    }, [futureTerms])    

    return [timer, resetTimer]
}

