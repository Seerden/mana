const passFail = {
    0: 'fail',
    1: 'pass'
}

export const mockSession = {
    owner: "seerden",
    listIds: [1],
    terms: [{
        listId: 1,
        termIds: [11, 12, 13]
    }],
    settings: {
        n: 2,
        direction: 'forwards',
        sessionStart: new Date("May 24, 2021, 15:51"),
        sessionEnd: new Date(),
    },
    date: {
        start: new Date("May 24, 2021, 15:51"),
        end: new Date()
    },
    passfail: [passFail[0], passFail[1], passFail[1], passFail[1], passFail[1], passFail[1], passFail[1]] as PassFail[],
    timePerCard: [...new Array(6)].map(i => Math.floor(60000*Math.random()))
}