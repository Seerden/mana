import { Field, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass, Severity, modelOptions } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

import { dbConn } from "../../db/db";
import { List } from "./List";
import { Ref } from "../../custom_types";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class User {
    @Field(() => String)
    _id: ObjectId;

    @Property( {unique: true, required: true })
    @Field(() => String)
    username: string;

    @Property({default: new Array()})
    @Field(() => [List], {nullable: true })
    lists: Ref<List>[];  // mongoose ObjectId[]

    @Property()
    @Field(() => String)
    currentSession?: ObjectId;  // mongoose ObjectId

    @Property({required: true})
    @Field()
    password: string;
}

export const UserModel = getModelForClass(User, { existingConnection: dbConn });