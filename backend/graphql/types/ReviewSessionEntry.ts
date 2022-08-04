import { Field, InputType, Int, ObjectType } from "type-graphql";

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

@ObjectType()
export class ReviewSessionEntry extends ReviewSessionEntryInput {
   @Field(() => Int)
   review_session_id: number;

   @Field(() => Int)
   review_entry_id: number;
}
