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

    @Field(() => [String])
    to: string[]

    @Field(() => [NewListTerm])
    terms: NewListTerm[] // NewTerm? 

}

@ObjectType()
@InputType("ListUpdateActionInput")
export class ListUpdateAction {
    @Field(() => String)
    type: "name"
}

@ObjectType()
@InputType("ListUpdatePayloadInput")
export class ListUpdatePayload {
    @Field(() => String, { nullable: true })
    name?: string
}