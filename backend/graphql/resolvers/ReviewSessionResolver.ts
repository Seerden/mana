import { Resolver, Arg, Mutation, ObjectType, Field } from "type-graphql";
import { asObjectId } from "../helpers/as";
import { maybeAddSessionToList } from "../helpers/list";
import { bulkUpdateTerms } from "../helpers/term";
import { TermUpdateObject } from "../types/input_types/term";
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
        @Arg("newReviewSession") newReviewSession: ReviewSessionBase,
        @Arg("termUpdateArray", type => [TermUpdateObject]) termUpdateArray: [TermUpdateObject]
    ): Promise<MaybeReviewSession> {
        const newReviewSessionDocument = new ReviewSessionModel(newReviewSession);
        const savedReviewSession = await newReviewSessionDocument.save();

        if (savedReviewSession) {
            await bulkUpdateTerms(termUpdateArray);
            await maybeAddSessionToList(savedReviewSession._id, savedReviewSession.listIds.map(entry => asObjectId(entry._id)))
            return { savedReviewSession }
        }

        return { error: 'Failed to save review session to database' }
    }
}