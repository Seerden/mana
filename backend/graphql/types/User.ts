import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
   @Field()
   username: string;

   @Field()
   password: string;

   @Field()
   user_id: number;

   @Field(() => Int)
   created_at: number;
}

@ObjectType()
@InputType("UserInput")
export class UserInput implements Partial<User> {
   @Field()
   username: string;

   @Field()
   password: string;
}

export type UserId = User["user_id"];
