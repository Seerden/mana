import dayjs from 'dayjs';

export const extractSession = (list, i) => {
    let sessionStartDate = dayjs(list.sessions[i].start);
    let sessionEndDate = dayjs(list.sessions[i].end);

    let session = list.content
        .map(term => {
            if (Date(sessionStartDate) === Date(term.history[i]?.date)) {
                return term.history[i]?.content
            }

            return null
        })
        .filter(d => d !== null)

    return ({ start: sessionStartDate, end: sessionEndDate, session: session })

}

/**
 * Takes a list, returns all its sessions with the specified direction, and its length.
 * @param {Object} listObj 
 * @param {'forwards' | 'backwards'} direction
 */
export const extractSessionsByDirection = (listObj, direction) => {
    const sessionsByDirection = listObj.sessions?.filter(sess => sess.direction === direction);
    return [sessionsByDirection.length, sessionsByDirection]
}

/**
 * Extract all sessions with a given direction from a term's history
 * @param {Object} term 
 * @param {String} direction 'forward(s)' or 'backward(s)'
 */
export const termSessionsByDirection = (term, direction) => {
    return term.history?.filter(sess => sess.direction === direction)
}

export const colorMap = {
    // null: '#444',
    0: 'orangered',
    1: 'goldenrod',
    2: 'seagreen',
    3: 'deepskyblue',
    4: 'blueviolet',
}

export const colorBySaturation = saturation => {
    return colorMap[saturation]
}

/**
 * Takes a list, returns new list.state based on review session that was just completed.
 * @param {Object} list List document
 * @param {'forwards' | 'backwards'} direction direction of review session that was completed right before this function was called
 * @returns {{forwards: String, backwards: String}}
 */
export function maybeUpdateListStateAfterReview(list, direction) {
    const [previousSessionLength] = extractSessionsByDirection(list, direction);
    console.log('previousSessionLength', previousSessionLength, 'state:', list.state[direction]);

    // ----- dev functionality (some old lists have recorded sessions from before this feature was implemented):
    if (previousSessionLength > 0 && list.state[direction] === 'untouched') {
        if (previousSessionLength === 2) {
            return { ...list.state, [direction]: 'seeded' }
        } return { ...list.state, [direction]: 'seeding' }

    }
    // -----

    switch (previousSessionLength) {
        case 0:
            return { ...list.state, [direction]: 'seeding' }
        case 2:
            return { ...list.state, [direction]: 'seeded' };
        default:
            return list.state
    }

}