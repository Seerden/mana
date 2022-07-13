import { Field, InputType, ObjectType } from "type-graphql";

// TODO: this shouldn't also be an InputType, because term_id doesn't exist yet
// at this point.
@ObjectType()
@InputType("TermInput")
export class Term {
   @Field()
   term_id: number;

   @Field()
   user_id: number;

   @Field()
   list_id: number;

   @Field()
   to_language: string;

   @Field()
   from_language: string;
}
