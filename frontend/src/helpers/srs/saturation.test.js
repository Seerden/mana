import { saturate, saturateUnseededTerm } from './saturation';

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
        term.history[0].content = session;
        expect(saturateUnseededTerm(term)).toEqual(expectedReturn)
    })
})

describe('saturate', () => {
    const term = {history: null}
    const cases = [
        [[{content: ['pass', 'fail', 'pass']},{content: ['pass', 'fail', 'pass']},{content: ['pass', 'fail', 'pass']}], 1],
        [[{}, {}], null]
    ]

    test.each(cases)(`given %o, correctly returns %o`, (history, expectedReturn) => {
        term.history = history;
        expect(saturate(term)).toEqual(expectedReturn)
    })
})