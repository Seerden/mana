import { Field, ID, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass, Severity, modelOptions } from '@typegoose/typegoose';
import mongoose, { ObjectId } from 'mongoose';
import { dbConn } from "../../db/db";

const ObjectId = mongoose.Types.ObjectId;

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class User {
    @Field(() => ID)
    _id: ObjectId;

    @Property( {unique: true, required: true })
    @Field(() => String)
    username: string;

    @Property()
    @Field(() => [String], {nullable: true })
    lists?: typeof ObjectId[];  // mongoose ObjectId[]

    @Property()
    @Field(() => String)
    currentSession?: typeof ObjectId;  // mongoose ObjectId

    @Property({required: true})
    @Field()
    password: string;
}

export const UserModel = getModelForClass(User, { existingConnection: dbConn });