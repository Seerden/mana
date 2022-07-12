import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Ref } from "../../custom_types";
import { ReviewSession } from "./ReviewSession";
import { Term } from "./Term";

@ObjectType()
@InputType("ListState")
class ListState {
    // @todo: rename to ListReviewDateArray
    @Field(() => [Date])
    forwards: Date[];

    @Field(() => [Date])
    backwards: Date[];
}

@ObjectType()
export class List {
    @Field(() => ID)
    _id: ObjectId;

    @Field(() => String)
    owner: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    from: string;

    @Field()
    to: string;

    @Field(() => [Term])
    // terms?: Array<Ref<Term>>
    terms: Ref<Term>[];

    @Field(() => [ReviewSession], { nullable: true })
    sessions: Array<Ref<ReviewSession>>;

    @Field(() => Date)
    created: Date;

    @Field(() => Date)
    lastReviewed?: Date;

    @Field(() => [String])
    setMembership: Array<mongoose.Types.ObjectId>; // @todo: implement Set type

    @Field(() => ListState, { nullable: true })
    reviewDates?: ListState;
}

@ObjectType()
export class MaybeList {
    @Field(() => List, { nullable: true })
    list?: List;

    @Field({ nullable: true })
    error?: string;
}
