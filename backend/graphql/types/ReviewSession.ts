import { getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { dbConn } from "../../db/db";
import { withId } from "../mixins/withId";
import { ObjectId } from 'mongodb'

@ObjectType()
@InputType("IdInput")
class Id {
    @Field(() => String)
    _id: ObjectId
}

@ObjectType()
@InputType("ReviewSettingsInput")
class ReviewSettings {
    @prop()
    @Field(() => String)
    direction: 'forwards' | 'backwards';

    @prop()
    @Field()
    n: number;

    @prop()
    @Field()
    sessionStart: Date;

    @prop()
    @Field()
    sessionEnd: Date;

    @prop()
    @Field()
    started: boolean;

    @prop()
    @Field()
    ended: boolean
}

@ObjectType()
@InputType("ReviewSessionTermsInput")
class ReviewSessionTerms {
    @prop({ ref: 'List' })
    @Field(() => String)
    listId: Id
    
    @prop({ ref: 'Term' })
    @Field(() => [String])
    termIds: Id[]
}

@ObjectType()
@InputType("ReviewDateInput")
class ReviewDate {
    @prop()
    @Field()
    start: Date;

    @prop()
    @Field()
    end: Date
}

// create base ReviewSessions class without _id field
@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@InputType("ReviewSessionBaseInput")
export class ReviewSessionBase {
    @prop({ required: true })
    @Field(() => String)
    owner: String;

    @prop()
    @Field(() => [Id], { nullable: true })
    listIds: Id[]

    @prop({ required: true})
    @Field(() => ReviewDate)
    date: ReviewDate

    @prop({ required: true })
    @Field(() => ReviewSessionTerms)
    terms: ReviewSessionTerms

    @prop({ required: true })
    @Field(() => ReviewSettings)
    settings: ReviewSettings

    @prop({ required: true })
    @Field(() => [String])
    passfail: string[]

    @prop({ required: true })
    @Field(() => [Int])
    timePerCard: number[]
}

// extend this with an _id field using our withId mixin
@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ReviewSession extends withId(ReviewSessionBase) {}

export const ReviewSessionModel = getModelForClass(ReviewSession, { existingConnection: dbConn })