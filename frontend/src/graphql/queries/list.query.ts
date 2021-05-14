import { useQuery } from "react-query";
import { gql, request} from 'graphql-request';
import { List as TList } from "graphql/codegen-output";

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
    console.log(listByIdQuery(ids));

    const { data, refetch, isLoading, isFetching, ...rest } = useQuery<[TList]>("listsById", async () => {
        const { listsById } = await request(process.env.REACT_APP_GRAPHQL_URI!, listByIdQuery(ids));
        return listsById
    }, {
        retry: false
    });

    return { data, isLoading, isFetching, ...rest} as const;
};