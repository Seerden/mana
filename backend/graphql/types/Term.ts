import { getModelForClass, modelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { createUnionType, Field, ID, InputType, ObjectType } from "type-graphql";
import { dbConn } from "../../db/db";
import { List } from './List';

@ObjectType()
@InputType("TermHistoryInput")
export class TermHistory {
    @Field(() => Date)
    date: Date;

    @Field(() => [String])
    content: Array<'pass' | 'fail'>;

    @Field(() => String)
    direction: 'forwards' | 'backwards';
}

@ObjectType()
@InputType("TermLanguagesInput")
export class TermLanguages {
    @Field({ nullable: true })
    from: string

    @Field({ nullable: true })
    to: string
}

@ObjectType() 
@InputType("TermSaturationInput")
export class TermSaturation {
    @Field({ nullable: true })
    forwards?: number

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

    @prop()
    @Field(() => TermLanguages, { nullable: true })
    languages: TermLanguages

    @prop({ required: true })
    @Field()
    to: String;

    @prop({ required: true })
    @Field()
    from: String;

    @prop({ default: [] })
    @Field(() => [TermHistory], { nullable: true })
    history: TermHistory[];

    @prop({ required: true, default: { forwards: null, backwards: null } })
    @Field(() => TermSaturation)
    saturation: TermSaturation

    @prop({ required: true })
    @Field(() => [List])
    listMembership: Ref<List>[];
}

export const TermModel = getModelForClass(Term, { existingConnection: dbConn })