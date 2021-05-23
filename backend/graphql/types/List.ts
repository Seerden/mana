import { Field, ID, InputType, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass, Ref, index, mongoose, modelOptions, Severity } from '@typegoose/typegoose';
import { ReviewSession } from "./ReviewSession";
import { dbConn } from "../../db/db";
import { TermsUnion } from "../resolvers/ListResolver";
import { ObjectId } from "mongodb";

type ListStateUnion = 'untouched' | 'seeding' | 'seeded';

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@InputType("ListState")
class ListState { // @todo: rename to ListReviewDateArray
    @Property({ default: new Array() })
    @Field(() => [Date], { nullable: true })
    forwards?: Date[];

    @Property({ default: new Array() })
    @Field(() => [Date], { nullable: true })
    backwards?: Date[];
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
@index({ collation: { locale: 'en', strength: 2 } })
export class List {
    @Field(() => ID)
    readonly _id: ObjectId

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
    @Field(() => [String])
    to: string[];

    @Property({ ref: "Term" })
    @Field(() => [TermsUnion])
    // terms?: Array<Ref<Term>>
    terms?: Array<typeof TermsUnion>

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

    @Property({ _id: false })
    @Field(() => ListState)
    reviewDates: ListState
}

@ObjectType()
export class MaybeList {
    @Field(() => List, { nullable: true })
    list?: List

    @Field({ nullable: true })
    error?: string
}

export const ListModel = getModelForClass(List, { existingConnection: dbConn });