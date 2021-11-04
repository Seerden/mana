import { List, Term } from "graphql/codegen-output";

function mockString(length: number): string {
    return [...new Array(length).keys()]
        .map(entry => Math.round(10*Math.random()))
        .join('');
}

const languages = [
    'English', 
    'Japanese', 
    'Dutch', 
    'French', 
    'German', 
    'Spanish', 
    'Chinese (Mandarin)', 
    'Chinese (Cantonese)'
]

const saturationLevels = [-1, ...new Array(5).keys()];

function getRandomArrayEntry(array: any[]) {
    const length = array.length;
    const index = Math.floor(Math.random()*(length+1));
    return array[index]
}

export function mockTerm(): Term {
    const term: Term = {
        _id: mockString(10),
        owner: mockString(6),
        from: mockString(5),
        to: mockString(5),
        languages: {
            from: getRandomArrayEntry(languages),
            to: getRandomArrayEntry(languages),
        },
        listMembership: [mockString(10)] as unknown as List[],
        history: [],
        saturation: {
            forwards: getRandomArrayEntry(saturationLevels),
            backwards: getRandomArrayEntry(saturationLevels)
        }

    };

    return term;
}