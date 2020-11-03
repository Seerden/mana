import { extractSessionsByDirection } from './list.api';

let list = {sessions: []};

// from list
describe('extractSessionsByDirection', () => {
    let cases = [
        [['forward', 'backward', 'forward'], 'forward', 2],
        [['forward', 'forward'], 'backward', 0],
        [['forward', 'backward', 'backward'], 'backward', 2],
        [[], 'backward', 0],
    ]

    test.each(cases)("given session directions %o and direction '%s', returns array of length '%s'", (sessions, direction, expectedResult) => {
        let list = {sessions: []};
        sessions.map((sess, idx) => {
            list.sessions[idx] = {direction: sess}
        })
        expect(extractSessionsByDirection(list, direction)).toHaveLength(expectedResult)
    })

    cases = [
        [['forward', 'forward'], '', undefined],
        [[], '', undefined]
    ]

    test.each(cases)("Correctly returns falsy value when not provided direction", (sessions, direction, expectedResult) => {
        list.sessions = sessions
        expect(extractSessionsByDirection(list, direction)).toBeFalsy;
    })

    test('given no sessions and/or no direction, returns falsy value', () => {
        let list = []
        expect(extractSessionsByDirection(list, '')).toBeFalsy;
    })

});

// from term
describe('extractSessionsByDirectionFromTerm', () => {
    
})