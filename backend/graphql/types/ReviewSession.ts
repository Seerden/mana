import { Field, Float, InputType, Int, ObjectType } from "type-graphql";
import { ReviewSessionEntry } from "./ReviewSessionEntry";

@ObjectType()
@InputType("ReviewSessionWithoutUserIdInput")
export class ReviewSessionWithoutUserId {
   @Field(() => Float)
   start_date: number;

   @Field(() => Float, { nullable: true })
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

@ObjectType()
@InputType("ReviewSessionInput")
export class ReviewSessionInput extends ReviewSessionWithoutUserId {
   @Field(() => Int)
   user_id: number;
}

@ObjectType("ReviewSession")
export class ReviewSession extends ReviewSessionInput {
   @Field()
   review_session_id: number;
}

@ObjectType()
export class SessionAndEntries {
   @Field(() => ReviewSession)
   session: ReviewSession;

   @Field(() => [ReviewSessionEntry])
   entries: ReviewSessionEntry[];
}
