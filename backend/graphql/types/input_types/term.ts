import { Field, InputType } from "type-graphql";
import { TermHistory, TermSaturation } from "../Term";

@InputType()
export class TermUpdateObject {
    @Field()
    _id: string;

    @Field(type => TermHistory, { nullable: true })
    history: TermHistory;

    @Field(type => TermSaturation, { nullable: true })
    saturation: TermSaturation
}

@InputType()
export class TermEditObject {
    @Field()
    _id: string;

    @Field({ nullable: true })
    to: string

    @Field({ nullable: true })
    from: string
}