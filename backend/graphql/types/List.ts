import { Field, ObjectType } from "type-graphql";
import { Term } from "./Term";

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
export class MaybeList {
   @Field(() => List, { nullable: true })
   list?: List;

   @Field({ nullable: true })
   error?: string;
}

@ObjectType()
export class ListAndTerms {
   @Field(() => List)
   list: List;

   @Field(() => [Term], { nullable: "items" })
   terms: Term[];
}
