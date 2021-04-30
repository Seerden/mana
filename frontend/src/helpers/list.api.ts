import dayjs from 'dayjs';

type Direction = 'forwards' | 'backwards';

export const extractSession = (list, i: number) => {
    let sessionStartDate = dayjs(list.sessions[i].start);
    let sessionEndDate = dayjs(list.sessions[i].end);

    let session = list.content
        .map(term => {
            if (sessionStartDate === term.history[i]?.date) {
                return term.history[i]?.content
            }

            return null
        })
        .filter(d => d !== null)

    return ({ 
        start: sessionStartDate, 
        end: sessionEndDate, 
        session: session 
    })

}

/**
 * Takes a list, returns all its sessions with the specified direction, and its length.
 * @param {Object} listObj 
 */
export const extractSessionsByDirection = (listObj, direction: Direction) => {
    const sessionsByDirection = listObj.sessions?.filter(sess => sess.direction === direction);
    return [sessionsByDirection.length, sessionsByDirection]
}

/**
 * Extract all sessions with a given direction from a term's history
 * @param {Object} term 
 */
export const termSessionsByDirection = (term, direction: Direction) => {
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
 * @returns {{forwards: String, backwards: String}}
 */
export function maybeUpdateListStateAfterReview(list, direction: Direction) {
    const [previousSessionLength] = extractSessionsByDirection(list, direction);

    switch (previousSessionLength) {
        case 0:
            return { ...list.state, [direction]: 'seeding' }
        case 2:
            return { ...list.state, [direction]: 'seeded' };
        default:
            return list.state
    }

}