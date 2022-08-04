import { Arg, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { UserId } from "../helpers/insert-user-id";
import {
   ReviewSession,
   ReviewSessionWithoutUserId,
   SessionAndEntries,
} from "../types/ReviewSession";
import { ReviewSessionEntryInput } from "../types/ReviewSessionEntry";
import { createReviewSession } from "./review-session/create-review-session";

@Resolver(() => ReviewSession)
export class ReviewSessionResolver {
   @Query(() => [ReviewSession], { nullable: "items" })
   @Authorized()
   async sessionsById(
      @Arg("user_id") user_id: number,
      @Arg("sessionIds", () => [Int]) sessionIds: number[]
   ) {
      // fetch review sessions by id
   }

   @Query(() => [ReviewSession], { nullable: "items" })
   @Authorized()
   async sessionsByUser(@Arg("user_id") user_id: number) {
      // fetch review sessions by user_id
   }

   @Mutation(() => SessionAndEntries)
   async createSession(
      @UserId() user_id: number,
      @Arg("session") session: ReviewSessionWithoutUserId,
      @Arg("entries", () => [ReviewSessionEntryInput]) entries: ReviewSessionEntryInput[]
   ) {
      return createReviewSession({ session: { ...session, user_id }, entries });
   }
}
