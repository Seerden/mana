import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";
import { ObjectId } from 'mongodb';
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Ref } from "../../custom_types";
import { dbConn } from "../../db/db";
import { List } from './List';

@ObjectType()
@InputType("TermHistoryInput")
export class TermHistory {
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
@InputType("TermLanguagesInput")
export class TermLanguages {
    @prop()
    @Field({ nullable: true })
    from: string

    @prop()
    @Field({ nullable: true })
    to: string
}

@ObjectType() 
@InputType("TermSaturationInput")
export class TermSaturation {
    @prop()
    @Field({ nullable: true })
    forwards?: number

    @prop()
    @Field({ nullable: true })
    backwards?: number
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
@InputType("TermInput")
export class Term {
    @Field(() => ID)
    readonly _id: ObjectId

    @prop({ required: true })
    @Field()
    owner: string;

    @prop({_id: false})
    @Field(() => TermLanguages, { nullable: true })
    languages: TermLanguages

    @prop({ required: true })
    @Field()
    to: string;

    @prop({ required: true })
    @Field()
    from: string;

    @prop({ default: [], _id: false })
    @Field(() => [TermHistory], { nullable: 'items'})
    history: TermHistory[];

    @prop({ required: true, _id: false })
    @Field(() => TermSaturation)
    saturation: TermSaturation;

    @prop({ ref: 'List' })
    @Field(() => [List], { nullable: 'items' })
    listMembership: Ref<List>[];
}

export const TermModel = getModelForClass(Term, { existingConnection: dbConn })