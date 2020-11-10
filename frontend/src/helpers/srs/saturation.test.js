import { saturate, saturateSeededTerm, saturateUnseededTerm } from './saturation';

const term = {
    history: [
        {
            date: Date.now(),
            content: null,
        }
    ]
}

describe('saturateUnseededTerm', () => {
    const cases = [
        [['pass', 'pass'], 2], 
        [['pass','fail','pass'], 1], 
        [['pass','fail','fail','pass'], 0],
        [[], false]
    ]

    test.each(cases)(`given %s, correctly returns %s`, (session, expectedReturn) => {
        let history = []
        history[0] = {content: session};
        expect(saturateUnseededTerm(history)).toEqual(expectedReturn)
    })
})

describe('saturateSeededTerm', () => { // @todo expand tests, make a separate describe block for each initial saturation level
    const cases = [
        // [filteredHistory (least to most recent), saturation, expected]
        [[{content: ['pass', 'pass']}, {content: ['fail', 'fail', 'pass', 'pass']}, {content: ['pass', 'pass']}], 0, 1],
        [[{content: ['pass', 'pass']}, {content: ['fail', 'fail', 'pass', 'pass']}, {content: ['fail', 'pass']}], 1, 0],
        [[{content: ['pass', 'pass']}, {content: ['pass', 'pass']}, {content: ['pass', 'pass']}], 2, 3],
        [[{content: ['pass', 'pass']}, {content: ['pass', 'pass']}, {content: ['pass', 'pass']}], 3, 4],
        [[{content: ['pass', 'pass']}, {content: ['pass', 'pass']}, {content: ['pass', 'fail']}], 4, 3],
    ];

    test.each(cases)(`given history: %p, saturation: %i, returns %i`, (filteredHistory, saturation, expectedReturn) => {
        expect(saturateSeededTerm(filteredHistory, saturation)).toEqual(expectedReturn)
    })
})


// describe('saturate', () => {
//     const term = {history: null}
//     const cases = [
//         [[{content: ['pass', 'fail', 'pass']},{content: ['pass', 'fail', 'pass']},{content: ['pass', 'fail', 'pass']}], 1],
//         [[{}, {}], null]
//     ]

//     test.each(cases)(`given %o, correctly returns %o`, (history, expectedReturn) => {
//         term.history = history;
//         expect(saturate(term)).toEqual(expectedReturn)
//     })
// })