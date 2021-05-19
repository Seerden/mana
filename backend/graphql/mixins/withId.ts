import { ClassType, Field, ID, InputType, ObjectType } from "type-graphql";
import { ObjectId } from 'mongodb';

export function withId<TClassType extends ClassType>(BaseClass: TClassType) {
    @ObjectType({ isAbstract: true })  // isAbstract prevents the class from being registered in the schema
    @InputType({ isAbstract: true })
    class WithId extends BaseClass {
        @Field(() => ID)
        _id: ObjectId
    };

    return WithId
}