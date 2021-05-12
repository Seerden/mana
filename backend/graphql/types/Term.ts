import { getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { createUnionType, Field, ID, ObjectType } from "type-graphql";
import { dbConn } from "../../db/db";
import { List } from './List';

@ObjectType()
class TermHistory {
    @prop()
    @Field(() => Date)
    date: Date;

    @prop()
    @Field(() => [String])
    content: Array<'pass' | 'fail'>;

    @prop()
    @Field(() => String)
    direction: 'forwards' | 'backwards';
}

@ObjectType()
class TermLanguages {
    @prop()
    @Field()
    from: String

    @prop()
    @Field()
    to: String
}

@ObjectType() 
class TermSaturation {
    @prop()
    @Field({ nullable: true })
    forwards?: number

    @prop()
    @Field({ nullable: true })
    backwards?: number
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Term {
    @prop()
    @Field(() => String)
    _id: ObjectId

    @prop({ required: true })
    @Field()
    owner: String;

    @prop({ required: true })
    @Field(() => TermLanguages)
    languages: TermLanguages

    @prop({ required: true })
    @Field()
    to: String;

    @prop({ required: true })
    @Field()
    from: String;

    @prop()
    @Field(() => [TermHistory], { nullable: true })
    history: TermHistory[];

    @prop({ required: true })
    @Field(() => TermSaturation)
    saturation: TermSaturation

    @prop()
    @Field(() => [List])
    listMembership: Ref<List>[];
}

export const TermModel = getModelForClass(Term, { existingConnection: dbConn })