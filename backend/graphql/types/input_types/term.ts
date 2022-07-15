import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
@InputType()
export class NewTermWithoutIds {
   @Field()
   from_language: string;

   @Field()
   to_language: string;

   @Field()
   from_value: string;

   @Field()
   to_value: string;
}

@ObjectType("NewTerm")
@InputType("NewTermInput")
export class NewTerm extends NewTermWithoutIds {
   @Field(() => Int)
   user_id: number;

   @Field(() => Int)
   list_id: number;
}
