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