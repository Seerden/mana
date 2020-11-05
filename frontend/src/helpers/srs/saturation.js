import { countDict } from '../count';
import { termSessionsByDirection } from '../list.api';
import duration from 'dayjs/plugin/duration.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
  dayjs.extend(relativeTime);
  dayjs.extend(duration);

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
export function saturate(term, direction) {
    // filter term's history by direction
    const filteredHistory = termSessionsByDirection(term, direction);

    if (!filteredHistory || filteredHistory.length < 3) {
        return null;
    }

    if (filteredHistory.length === 3 || !term.saturation?.direction) { // if reviewed exactly n times, seeding has just ended, so we can saturate based on seeding round
        return saturateUnseededTerm(filteredHistory);
    }
    // if reviewed more than n times, saturate based on a combination of (1) time since last session, (2) current saturation level, (3) performance in the session that was just completed
    // saturateSeededTerm(filteredHistory)
}

/**
 * Set saturation of a term that has finished undergoing seeding
 * @param {Object} term List model contains .content, which is an array of terms, of which this ('term') is an entry.
 */
export function saturateUnseededTerm(filteredHistory) {
    /*  @note
           initial seeding does not take into consideration:
            - time between sessions. minimum time between sessions will be enforced elsewhere for UX purposes, though
            - performance of first n-1 seeding rounds  */
    const latestSession = filteredHistory?.reverse()[0]?.content; // extract last seeding session content
    const sessionSet = new Set(latestSession);

    if (!latestSession || (latestSession && !(latestSession.length > 0))) {
        return false;
    }
    // post-seeding saturation is relatively simple: by now, all terms should _definitely_ be in short-term memory, so mistakes are judged harhsly
    // @todo: transform all 'pass' and 'fail' mentions by 1 and 0 respectively
    const passFailCount = countDict(latestSession);

    if (!sessionSet.has('fail')) { return 2; }
    if (passFailCount.fail > 1) { return 0; }
    return 1;
}

/**
 * Saturate a term that already has a saturation level.
 * @todo Implement functionality
 * @param {*} term 
 */
export function saturateSeededTerm(term) {
    // extract session
    const lastTwoSessions = term.history.reverse().slice(0, 2);
    const currentSaturation = term.saturation;


}

/**
 * Determine whether the latest session was valuable, given the term's current saturation level, time between two sessions, and results in those two sessions
 * @todo Implement functionality
 * @param {Object} firstSession term review session, like {date: ..., content: ...}. Session argument order doesn't matter.
 * @param {Object} secondSession term review session, like {date: ..., content: ...}. Session argument order doesn't matter.
 * @param {Array} saturationLevels Array containing saturation levels and corresponding timescales. Currently hardcoded, could become user-specified settings eventually.
 */
export function isSessionValuable(firstSession, secondSession, saturation, saturationLevels) {
    /* philosophy:
        if I reviewed a term an hour ago, it doesn't matter that I got it correct this time around,
        if I reviewed it an hour ago, knew it then, but _don't_ know it now, this *does* carry meaning,
        if I'm on long-term sustain for a term, it doesn't really matter if I reviewed it two weeks ago instead of a month ago.
        */
    const timeBetween = secondSession.date - firstSession.date;
    const intendedTimescale = saturationLevels.find(d => d.level === saturation)?.timescale;

    // if timebetween < intendedtimescale for certain saturation levels
}