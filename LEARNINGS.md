- # Using Typegoose with Type-GraphQL
    - define the _id field only as (readonly) `Field()` in the class creation, not as prop(), because if we use prop() then Typegoose expects us to provide our own _id definition, and will not generate one automatically
    - make sure all nested properties are also tagged as prop() in the class where we define them, not just in the class where we define the typegoose model/type-graphql class)
- # Using variables from outside gql tags

- ## Server:
```javascript
    @ObjectType()
    @InputType("TwoInput")
    class Two {
        @Field()
        three: string;

        @Field()
        four: string;
    }

    @InputType("TestInput")
    @ObjectType()
    class Test {
        @Field(() => [Int])
        one: number[];

        @Field(() => Two)
        two: Two;
    }

    @ObjectType()
    class Message {
        @Field()
        message: string
    }

    @Resolver(of => List) 
    class ListResolver {
        @Query(() => Message)
        async test(
            @Arg("testObj") testObj: Test
        ) {
            console.log(testObj);
    
            return { message: 'Hi there!'}
        }
    }
```

- ## Client
```javascript
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

    const { data, ...rest } = useQuery("testQuery", async () => {
        const response = await request(process.env.REACT_APP_GRAPHQL_URI!, testQuery, { testObj });
        return response
    });

    useEffect(() => {
        console.log(testQuery);
    }, [])

    return data
```

Carefully parse the above syntax combination:
- Server-side, we define our query inside a resolver, with proper types and input types (basically, remember that every type that may be used as the type of an argument (either of a query or a mutation, doesn't matter AFAIK), should be defined with `@InputType("INPUT_NAME_HERE"))`.
    - Then, when we define our query with the graphql-request library, we pre-define `$variableName: INPUT_NAME_HERE` (with a ! if it's non-nullable, and note that naming the query is optional here), and only then are we able to put the variables inside the third argument of `request()`. The only other alternative I see is manually parsing the input variables, which works for simple types, but I have no idea how to figure that out for more complex types like the one we're using