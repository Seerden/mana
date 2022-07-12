import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Ref } from "../../custom_types";
import { List } from "./List";

@ObjectType()
@InputType("TermHistoryInput")
export class TermHistory {
    @Field(() => Date)
    date: Date;

    @Field(() => [String])
    content: Array<"pass" | "fail">;

    @Field(() => String)
    direction: "forwards" | "backwards";
}

@ObjectType()
@InputType("TermLanguagesInput")
export class TermLanguages {
    @Field({ nullable: true })
    from: string;

    @Field({ nullable: true })
    to: string;
}

@ObjectType()
@InputType("TermSaturationInput")
export class TermSaturation {
    @Field({ nullable: true })
    forwards?: number;

    @Field({ nullable: true })
    backwards?: number;
}

@ObjectType()
@InputType("TermInput")
export class Term {
    @Field(() => ID)
    readonly _id: ObjectId;

    @Field()
    owner: string;

    @Field(() => TermLanguages, { nullable: true })
    languages: TermLanguages;

    @Field()
    to: string;

    @Field()
    from: string;

    @Field(() => [TermHistory], { nullable: "items" })
    history: TermHistory[];

    @Field(() => TermSaturation)
    saturation: TermSaturation;

    @Field(() => [List], { nullable: "items" })
    listMembership: Ref<List>[];
}
