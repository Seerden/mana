// @ts-nocheck

import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { TermUpdateObject } from "../types/input_types/term";
import { ReviewSession, ReviewSessionBase } from "../types/ReviewSession";
import { createReviewSession } from "./review-session/create-review-session";
import { queryReviewSessionsByUser } from "./review-session/query-by-user";

@ObjectType()
class MaybeReviewSession {
    @Field(() => ReviewSession, { nullable: true })
    savedReviewSession?: ReviewSession;

    @Field({ nullable: true })
    error?: string;
}

@Resolver((of) => ReviewSession)
export class ReviewSessionResolver {
    @Mutation(() => MaybeReviewSession)
    async createReviewSession(
        @Arg("newReviewSession") newReviewSession: ReviewSessionBase,
        @Arg("termUpdateArray", (type) => [TermUpdateObject])
        termUpdateArray: [TermUpdateObject]
    ): Promise<MaybeReviewSession> {
        return await createReviewSession(newReviewSession, termUpdateArray);
    }

    @Query(() => [ReviewSession])
    async reviewSessionsByUser(@Arg("owner") owner: string) {
        return await queryReviewSessionsByUser(owner);
    }
}
