import { createUnionType, Field, ID, Int, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass, Ref, index, mongoose, modelOptions, Severity } from '@typegoose/typegoose';
import { ReviewSession } from "./ReviewSession";
import { dbConn } from "../../db/db";
import { ObjectId } from "mongodb";
import { SessionsUnion, TermsUnion } from "../resolvers/ListResolver";
import { Term } from "./Term";

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
    _id: String


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
    @Field(() => [TermsUnion], { nullable: true })
    // terms?: Array<Ref<Term>>
    terms?: Array<typeof TermsUnion>

    @Property({ ref: "ReviewSession"})
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

    @Property()
    @Field()
    state: ListState
}



export const ListModel = getModelForClass(List, { existingConnection: dbConn });