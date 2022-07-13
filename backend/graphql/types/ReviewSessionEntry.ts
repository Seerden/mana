import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ReviewSessionEntry {
   @Field()
   review_entry_id: number;

   @Field()
   term_id: number;

   @Field()
   review_session_id: number;

   @Field()
   created_at: number;

   @Field()
   passfail: string;

   @Field()
   time_on_card: number;

   @Field()
   direction: string;
}
