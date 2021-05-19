import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType("NewListTermInput")
export class NewListTerm {
    @Field()
    from: string

    @Field()
    to: string
}

@ObjectType()
@InputType("NewListFromClientInput")
export class NewListFromClient {
    @Field()
    owner: string

    @Field()
    name: string

    @Field()
    from: string

    @Field()
    to: string

    @Field(() => [NewListTerm])
    terms: NewListTerm[] // NewTerm? 

}