import { Resolver, Arg, Mutation, Query, ObjectType, InputType, Field } from "type-graphql";
import { ReviewSession, ReviewSessionBase, ReviewSessionModel } from "../types/ReviewSession";

@ObjectType() 
class MaybeReviewSession {
    @Field(() => ReviewSession, { nullable: true })
    savedReviewSession?: ReviewSession

    @Field({ nullable: true })
    error?: string
}

@Resolver(of => ReviewSession)
export class ReviewSessionResolver {
    @Mutation(() => MaybeReviewSession)
    async createReviewSession(
        @Arg("newReviewSession") newReviewSession: ReviewSessionBase
    ): Promise<MaybeReviewSession> {
        const newReviewSessionDocument = new ReviewSessionModel(newReviewSession);

        const savedReviewSession = await newReviewSessionDocument.save();
        if (savedReviewSession) {
            return { savedReviewSession }
        }
        return { error: 'Failed to save review session to database'}
    }
}