import { Field, InputType, ObjectType } from "type-graphql";
import { Term, TermWithoutIds } from "./Term";

@ObjectType()
@InputType("NewListWithTermsInput")
/**
 * Represents a list, with terms, but without userId. To be used mainly
 * with`createList()`
 */
export class NewListWithTerms {
   @Field()
   name: string;

   @Field()
   from_language: string;

   @Field(() => String)
   to_language: string;

   @Field(() => [TermWithoutIds])
   terms: TermWithoutIds[];
}

@ObjectType()
export class List {
   @Field()
   list_id: number;

   @Field()
   user_id: number;

   @Field()
   name: string;

   @Field()
   from_language: string;

   @Field()
   to_language: string;

   @Field()
   created_at: number;

   @Field({ nullable: true })
   last_reviewed?: number;
}

@ObjectType()
export class ListAndTerms {
   @Field(() => List)
   list: List;

   @Field(() => [Term], { nullable: "items" })
   terms: Term[];
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
