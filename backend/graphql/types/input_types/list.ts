import { Field, InputType, ObjectType } from "type-graphql";
import { NewTermWithoutListId } from "./term";

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

   @Field(() => [NewTermWithoutListId])
   terms: NewTermWithoutListId[];
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
