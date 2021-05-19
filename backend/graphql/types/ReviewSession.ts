import { getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { dbConn } from "../../db/db";
import { List } from './List';
import { Term } from './Term';
import { ObjectId } from 'mongodb';

@ObjectType()
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
class ReviewSessionTerms {
    @prop({ ref: 'List' })
    @Field(() => List)
    listId: Ref<List>
    
    @prop({ ref: 'Term' })
    @Field(() => Term)
    termIds: Ref<Term>[]
}

@ObjectType()
class ReviewDate {
    @prop()
    @Field()
    start: Date;

    @prop()
    @Field()
    end: Date
}

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ReviewSession {
    @Field(() => ID)
    _id: ObjectId
    
    @prop({ required: true })
    @Field(() => String)
    owner: String;

    @prop()
    @Field(() => [List], { nullable: true })
    listIds: Ref<List>[]

    @prop({ required: true})
    @Field(() => ReviewDate)
    date: ReviewDate

    @prop()
    @Field(() => ReviewSessionTerms)
    terms: ReviewSessionTerms

    @prop()
    @Field(() => ReviewSettings)
    settings: ReviewSettings

    @prop()
    @Field(() => [String])
    passfail: string[]

    @prop()
    @Field(() => [Int])
    timePerCard: number[]
}

export const ReviewSessionModel = getModelForClass(ReviewSession, { existingConnection: dbConn })