import { Field, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { dbConn } from "../../db/db.js";

const ObjectId = mongoose.Schema.Types.ObjectId;

@ObjectType()
export class CUser {
    @Field(() => String)
    _id: typeof ObjectId;

    @Field(() => String)
    @Property( {unique: true, required: true })
    username: string;

    @Field(() => [String])
    lists?: typeof ObjectId[];  // mongoose ObjectId[]

    @Field(() => String)
    currentSession?: typeof ObjectId;  // mongoose ObjectId

    @Property({required: true})
    password: string;
}

export const UserModel = getModelForClass(CUser, { existingConnection: dbConn })