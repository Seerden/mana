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

export const extractSessionsByDirection = (listObj, direction) => {
    // @note: currently implemented as 'forwards' and 'backwards'
    // leaning to going for 'frontToBack' and 'backToFront' instead
    if (['forwards', 'backwards', 'forward', 'backward'].includes(direction)) {
        return listObj.sessions?.filter(sess => sess.direction === direction);
    } else {
        return;
    }
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