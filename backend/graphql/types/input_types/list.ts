import { Field, InputType, Int, ObjectType } from "type-graphql";
import { NewTermWithoutIds } from "./term";

@ObjectType()
@InputType("NewListWithoutUserIdInput")
export class NewListWithoutUserId {
   @Field()
   name: string;

   @Field()
   from_language: string;

   @Field(() => String)
   to_language: string;

   @Field(() => [NewTermWithoutIds])
   terms: NewTermWithoutIds[];
}

@ObjectType("NewList")
@InputType("NewListInput")
export class NewList extends NewListWithoutUserId {
   @Field(() => Int)
   user_id: number;
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
