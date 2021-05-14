import { useMutation, useQuery } from "react-query";
import { gql, request} from 'graphql-request';
import { List } from "graphql/codegen-output";
import { useEffect } from "react";

const listByIdQuery = (ids: [String]) => gql`
${CoreListFields}
${CoreTermFields}
${CoreTermIdFields}
query {
    listsById(ids: ${JSON.stringify(ids)}) {
        ...CoreListFields
        terms(populate:true) {
            ...CoreTermFields
            ...CoreTermIdFields
        }

    }
}
`

const CoreTermIdFields = gql`
fragment CoreTermIdFields on TermId {
    ...on TermId {
        _id
    }
}
`

const CoreTermFields = gql`
fragment CoreTermFields on Term {
    ...on Term {
        _id
        from
        to
        languages {
            from
            to
        }
        history {
            date
            content
            direction
        }
        saturation {
            forwards
            backwards
        }
    }
}
`

const CoreListFields = gql`
    fragment CoreListFields on List {
        _id
        owner
        name
        to
        from
    }
`

export function useQueryListsById(ids: [String]) {
    useEffect(() => {
        console.log(listByIdQuery(ids));
    }, [])

    const { 
        data, 
        refetch, 
        isLoading, 
        isFetching, 
        ...rest 
    } = useQuery<[List]>("listsById", async () => {
        const { listsById } = await request(process.env.REACT_APP_GRAPHQL_URI!, listByIdQuery(ids));
        return listsById
    }, {
        retry: false
    });

    return { data, isLoading, isFetching, ...rest} as const;
};

const deleteListMutation = (id: string) => gql`
mutation {
    deleteList(id: "${id}") {
        error
        success
    }
}
`;

export function useMutateDeleteList (id: string) {
    const { mutate, data, ...rest } = useMutation("deleteList", async () => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, deleteListMutation(id));
        return response;
    }, { retry: false });

    return { mutate, data, ...rest }
};

const testObj = {
    one: [1,2,3],
    two: {
        three: '3',
        four: '4'
    }
}

const testQuery = gql`
    query testQuery($testObj: TestInput!){
        test(testObj: $testObj) {
            message
        }
    }
`

export function useTestQuery() {
    const { data, ...rest } = useQuery("testQuery", async () => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, testQuery, { testObj });
        return response
    });

    useEffect(() => {
        console.log(testQuery);
    }, [])

    return data
}