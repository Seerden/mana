import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass, Ref, index, mongoose, modelOptions, Severity } from '@typegoose/typegoose';
import { ReviewSession } from "./ReviewSession";
import { Term } from './Term';
import { dbConn } from "../../db/db";

@ObjectType()
class ListState {
    @Property()
    @Field()
    forwards?: string;

    @Property()
    @Field()
    backwards?: string;
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
@index({ collation: { locale: 'en', strength: 2}})
export class List {
    @Property()
    @Field(() => ID)
    _id: mongoose.Types.ObjectId


    @Property()
    @Field(() => String)
    owner: String;

    @Property()
    @Field(() => String)
    name: String;

    @Property()
    @Field(() => String)
    from: String;

    @Property()
    @Field(() => [String])
    to: String[];

    @Property({ ref: "Term" })
    @Field(() => [Term])
    terms: Ref<Term>[]

    @Property({ ref: "ReviewSession"})
    @Field(() => [ReviewSession])
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

    @Property()
    @Field()
    state: ListState
}

export const ListModel = getModelForClass(List, { existingConnection: dbConn });