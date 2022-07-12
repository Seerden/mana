import { Field, ObjectType } from "type-graphql";
import { Ref } from "../../custom_types";
import { List } from "./List";

@ObjectType()
export class User {
    @Field(() => String)
    _id: ObjectId;

    @Field(() => String)
    username: string;

    @Field(() => [List], { nullable: true })
    lists: Ref<List>[]; // mongoose ObjectId[]

    @Field(() => String)
    currentSession?: ObjectId; // mongoose ObjectId

    @Field()
    password: string;
}
