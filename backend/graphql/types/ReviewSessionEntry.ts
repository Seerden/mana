import { Field, InputType, Int, ObjectType } from "type-graphql";
import { ReviewSession } from "./ReviewSession";

@ObjectType()
@InputType()
export class ReviewSessionEntryInput {
   @Field(() => Int)
   term_id: number;

   @Field()
   passfail: string;

   @Field(() => Int)
   time_on_card: number;

   @Field()
   direction: string;

   @Field()
   created_at: number;
}

export type EntryInputWithId = ReviewSessionEntryInput & {
   review_session_id: ReviewSession["review_session_id"];
};

@ObjectType()
export class ReviewSessionEntry extends ReviewSessionEntryInput {
   @Field(() => Int)
   review_session_id: number;

   @Field(() => Int)
   review_entry_id: number;
}
