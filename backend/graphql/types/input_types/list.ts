import { Field, InputType, ObjectType } from "type-graphql";
import { NewTerm } from "./term";

@ObjectType("NewList")
@InputType("NewListInput")
export class NewList {
   @Field()
   user_id: number;

   @Field()
   name: string;

   @Field()
   from_language: string;

   @Field(() => String)
   to_language: string;

   // TODO: unsure if I want to keep this structure, rename it, or use a
   // separate input field for to-be-inserted terms.
   @Field(() => [NewTerm])
   terms: NewTerm[]; // NewTerm?
}

@ObjectType()
@InputType("ListUpdateActionInput")
export class ListUpdateAction {
   @Field(() => String)
   type: "name";
}

@ObjectType()
@InputType("ListUpdatePayloadInput")
export class ListUpdatePayload {
   @Field()
   name: string;
}
