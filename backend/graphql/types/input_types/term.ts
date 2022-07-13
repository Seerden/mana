import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType("NewTerm")
@InputType("NewTermInput")
export class NewTerm {
   @Field()
   user_id: number;

   @Field()
   list_id: number;

   @Field()
   from_language: string;

   @Field()
   to_language: string;

   @Field()
   from_value: string;

   @Field()
   to_value: string;
}
