import { getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { dbConn } from "../../db/db";
import { List } from './List';
import { Term } from './Term';

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
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ReviewSession {
    @prop({ required: true })
    @Field(() => String)
    owner: String;

    @prop()
    @Field(() => [List], { nullable: true })
    listIds: Ref<List>[]

    @prop({ required: true})
    @Field(() => [Date])
    date: {
        start: Date,
        end: Date
    }

    @prop()
    @Field(() => ReviewSessionTerms)
    terms: ReviewSessionTerms

    @prop()
    @Field(() => ReviewSettings)
    settings: ReviewSettings

}



export const ReviewSessionModel = getModelForClass(ReviewSession, { existingConnection: dbConn })