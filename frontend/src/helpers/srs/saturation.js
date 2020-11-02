import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import duration from 'dayjs/plugin/duration.js';
  dayjs.extend(relativeTime);
  dayjs.extend(duration);
import { countDict } from '../count';

/**
 * @module saturation Provides all necessary functionality to extract and set term saturation (i.e. 'how well does a user know this term?')
 * @note thought process for development of this 'algorithm' is described in /src/components/list/.md
 * @todo consider: updating the term itself from here, or just returning the new saturation level and handling database update elsewhere (better)
 */

let day = 1000*3600*24
const saturationLevels = [
    {
        level: 0,
        description: 'Weak to no recollection.',
        timescale: day // review within a day
    },
    {
        level: 1,
        description: 'Middling short-term recollection.',
        timescale: 3*day
    },
    {
        level: 2,
        description: 'Good short-term recollection.',
        timescale: 7*day
    },
    {
        level: 3,
        description: 'Working towards long-term recollection',
        timescale: 14*day
    },
    {
        level: 4,
        description: 'Long-term recollection achieved. Low review priority',
        timescale: 30*day
    },
]

/**
 * Assign a new saturation level to the given term: after every session, each reviewed term will have its saturation level determined based on current/recent performance. 
 * Suggested review frequency is derived from this saturation level, meaning saturation is an integral part of our system.
 * @note saturation should be done on a per-term basis, since object structure for review input might not be rigid
 * @param {Object} term List model contains .content, which is an array of terms, of which this ('term') is an entry.
 */
export const saturate = (term) => {
    // check if reviewed < n times (where n is seeding session count), return 
    if (term.history.length < 3 ) {
        return null
    }

    // if reviewed exactly n times, seeding has just ended, so we can saturate based on seeding round
    if (term.history.length === 3) {
        return saturateUnseededTerm(term);
    }
    // if reviewed more than n times, saturate based on a combination of (1) time since last session, (2) current saturation level, (3) performance in the session that was just completed
}

/**
 * Set saturation of a term that has finished undergoing seeding
 * @param {Object} term List model contains .content, which is an array of terms, of which this ('term') is an entry.
 */
export const saturateUnseededTerm = (term) => {
    /*  @note
           initial seeding does not take into consideration:
            - time between sessions. minimum time between sessions will be enforced elsewhere for UX purposes, though
            - performance of first n-1 seeding rounds  */

    const latestSession = term.history.reverse()[0].content;  // extract last seeding session content
    const sessionSet = new Set(latestSession);

    if (!latestSession || (latestSession && !(latestSession.length > 0))) {
        return false;
    }
    // post-seeding saturation is relatively simple: by now, all terms should _definitely_ be in short-term memory, so mistakes are judged harhsly
    // @todo: transform all 'pass' and 'fail' mentions by 1 and 0 respectively
    
    const passFailCount = countDict(latestSession);

    if (!sessionSet.has('fail')) { return 2 }
    if (passFailCount.fail > 1) { return 0 }
    return 1
}

export const saturateSeededTerm = (term) => {
    // extract session
    const lastTwoSessions = term.history.reverse().slice(0,2);
    const currentSaturation = term.saturation;
}

/**
 * Determine whether the latest session was valuable, given the term's current saturation level, time between two sessions, and results in those two sessions
 * @param {Object} firstSession term review session, like {date: ..., content: ...}. Session argument order doesn't matter.
 * @param {Object} secondSession term review session, like {date: ..., content: ...}. Session argument order doesn't matter.
 * @param {Array} saturationLevels Array containing saturation levels and corresponding timescales. Currently hardcoded, could become user-specified settings eventually.
 */
export const isSessionValuable = (firstSession, secondSession, saturation, saturationLevels) => {
    /* philosophy: 
        if I reviewed a term an hour ago, it doesn't matter that I got it correct this time around,
        if I reviewed it an hour ago, knew it then, but _don't_ know it now, this *does* carry meaning,
        if I'm on long-term sustain for a term, it doesn't really matter if I reviewed it two weeks ago instead of a month ago.
        */

    const timeBetween = secondSession.date - firstSession.date;
    const intendedTimescale = saturationLevels.find(d => d.level === saturation);


}


/* General saturation gradient (best to worst):
    - no mistakes: 
    - no mistake first time, one mistake thereafter
    - mistake first time, no mistakes afterwards:
    - mistake first time, one or more mistakes after (n_correct >= n_mistake)
    - n_mistake > n_correct
*/