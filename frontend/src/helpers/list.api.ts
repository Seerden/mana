type Direction = 'forwards' | 'backwards';

/**
 * Takes a list, returns all its sessions with the specified direction, and its length.
 * @param {Object} listObj 
 */
export const extractSessionsByDirection = (list: List, direction: Direction) => {
    const sessionsByDirection = list.sessions?.filter(sess => sess.direction === direction);
    return [sessionsByDirection.length, sessionsByDirection]
}

/**
 * Extract all sessions with a given direction from a term's history
 * @param {Object} term 
 */
export const termSessionsByDirection = (term: Term, direction: Direction) => {
    return term.history.filter(session => session.direction === direction)
}

export const colorMap = {
    0: 'orangered',
    1: 'goldenrod',
    2: 'seagreen',
    3: 'deepskyblue',
    4: 'blueviolet',
}

export const colorBySaturation = (saturation: 'forwards' | 'backwards') => {
    return colorMap[saturation]
}

/**
 * Takes a list, returns new list.state based on review session that was just completed.
 */
export function maybeUpdateListStateAfterReview(list: List, direction: Direction) {
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