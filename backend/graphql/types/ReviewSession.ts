import { Field, InputType, Int, ObjectType } from "type-graphql";
import { withId } from "../mixins/withId";
import { List } from "./List";
import { Term } from "./Term";

@ObjectType()
@InputType("IdInput")
export class Id {
    @Field(() => String)
    _id: ObjectId;
}

@ObjectType()
@InputType("ReviewSettingsInput")
class ReviewSettings {
    @Field(() => String)
    direction: "forwards" | "backwards";

    @Field()
    n: number;

    @Field()
    sessionStart: Date;

    @Field()
    sessionEnd: Date;

    @Field()
    started: boolean;

    @Field()
    ended: boolean;
}

@ObjectType()
@InputType("ReviewSessionTermsInput")
class ReviewSessionTerms {
    @Field(() => String)
    listId: Ref<List>;

    @Field(() => [String])
    termIds: Ref<Term>[];
}

@ObjectType()
@InputType("ReviewDateInput")
class ReviewDate {
    @Field()
    start: Date;

    @Field()
    end: Date;
}

// create base ReviewSessions class without _id field
@ObjectType()
@InputType("ReviewSessionBaseInput")
export class ReviewSessionBase {
    @Field(() => String)
    owner: String;

    @Field(() => [Id], { nullable: true })
    listIds: Id[];

    @Field(() => ReviewDate)
    date: ReviewDate;

    @Field(() => ReviewSessionTerms)
    terms: ReviewSessionTerms;

    @Field(() => ReviewSettings)
    settings: ReviewSettings;

    @Field(() => [String])
    passfail: string[];

    @Field(() => [Int])
    timePerCard: number[];
}

// extend this with an _id field using our withId mixin
@ObjectType()
export class ReviewSession extends withId(ReviewSessionBase) {}
