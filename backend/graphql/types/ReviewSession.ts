import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ReviewSession {
   @Field()
   review_session_id: number;

   @Field()
   user_id: number;

   @Field()
   start_date: number;

   @Field(() => Int, { nullable: true })
   end_date: number;

   @Field()
   direction: string;

   @Field(() => Int)
   n: number;

   @Field(() => [Int], { nullable: "itemsAndList" })
   set_ids: number[];

   @Field(() => [Int], { nullable: "itemsAndList" })
   list_ids: number[];

   @Field(() => Int, { nullable: true })
   saturation_threshold: number;
}
