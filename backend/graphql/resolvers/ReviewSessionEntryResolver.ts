import { ExpressContext } from "apollo-server-express";
import { Arg, Ctx, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { ReviewSessionEntry } from "../types/ReviewSessionEntry";
import { getReviewEntriesForTerms } from "./review-session-entry/query-by-term";

@ObjectType()
class TermIdWithEntries {
   @Field(() => Int)
   term_id: number;

   @Field(() => [ReviewSessionEntry])
   entries: ReviewSessionEntry[];
}

@Resolver(() => ReviewSessionEntry)
export class ReviewSessionEntryResolver {
   @Query(() => [TermIdWithEntries])
   async sessionEntriesByTermIds(
      @Ctx() ctx: ExpressContext,
      @Arg("termIds", () => [Int]) termIds: number[]
   ) {
      // TODO: implement user check for the following function
      return getReviewEntriesForTerms(termIds);
   }
}
