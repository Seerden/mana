import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
@InputType("ReviewSessionInput")
export class ReviewSessionInput {
   @Field(() => Int)
   user_id: number;

   @Field(() => Int)
   start_date: number;

   @Field(() => Int, { nullable: true })
   end_date?: number;

   @Field()
   direction: string;

   @Field(() => Int)
   n: number;

   @Field(() => [Int], { nullable: "itemsAndList" })
   set_ids?: number[];

   @Field(() => [Int], { nullable: "itemsAndList" })
   list_ids?: number[];

   @Field(() => Int, { nullable: true })
   saturation_threshold?: number;
}

@ObjectType("ReviewSession")
export class ReviewSession extends ReviewSessionInput {
   @Field()
   review_session_id: number;
}
