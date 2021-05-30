import { Field, ID, InputType, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass, index, mongoose, modelOptions, Severity } from '@typegoose/typegoose';
import { ReviewSession } from "./ReviewSession";
import { dbConn } from "../../db/db";
import { ObjectId } from "mongodb";
import { Term } from "./Term";
import { Ref } from "../../custom_types";

type ListStateUnion = 'untouched' | 'seeding' | 'seeded';

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@InputType("ListState")
class ListState { // @todo: rename to ListReviewDateArray
    @Property({ default: new Array() })
    @Field(() => [Date])
    forwards: Date[];

    @Property({ default: new Array() })
    @Field(() => [Date])
    backwards: Date[];
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
@index({ collation: { locale: 'en', strength: 2 } })
export class List {
    @Field(() => ID)
    _id: ObjectId

    @Property()
    @Field(() => String)
    owner: string;

    @Property()
    @Field(() => String)
    name: string;

    @Property()
    @Field(() => String)
    from: string;

    @Property()
    @Field()
    to: string;

    @Property({ ref: "Term" })
    @Field(() => [Term])
    // terms?: Array<Ref<Term>>
    terms: Ref<Term>[]

    @Property({ ref: "ReviewSession" })
    @Field(() => [ReviewSession], { nullable: true })
    sessions: Array<Ref<ReviewSession>>

    @Property()
    @Field(() => Date)
    created: Date;

    @Property()
    @Field(() => Date)
    lastReviewed?: Date;

    @Property()
    @Field(() => [String])
    setMembership: Array<mongoose.Types.ObjectId>; // @todo: implement Set type

    @Property({ _id: false, default: { forwards: [], backwards: []} })
    @Field(() => ListState, { nullable: true })
    reviewDates?: ListState
}

@ObjectType()
export class MaybeList {
    @Field(() => List, { nullable: true })
    list?: List

    @Field({ nullable: true })
    error?: string
}

export const ListModel = getModelForClass(List, { existingConnection: dbConn });