import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from "type-graphql";
import { ReviewSessionEntry } from "../types/ReviewSessionEntry";
import {
   ReviewParamsInput,
   Term,
   TermSaturation,
   TermUpdateInput,
   TermWithoutId,
} from "../types/Term";
import { createTerms } from "./term/create-terms";
import { deleteTerms } from "./term/delete-terms";
import { queryTermsForReview } from "./term/get-terms";
import { resolveTermHistory } from "./term/resolve-history";
import { resolveTermSaturation } from "./term/resolve-saturation";
import { updateTermValues } from "./term/update-terms";

// We currently don't query terms by themselves,
//  only as part of their parent list's queries,
//   but this might change in the future

@Resolver(() => Term)
export class TermResolver {
   @Query(() => [Term])
   async queryTermsForReview(@Arg("reviewParams") reviewParams: ReviewParamsInput) {
      return queryTermsForReview({ filter: reviewParams });
   }

   @Mutation(() => [Term])
   async createTerms(@Arg("terms", () => [TermWithoutId]) terms: TermWithoutId[]) {
      return await createTerms({ terms });
   }

   @Mutation(() => [Term])
   async deleteTerms(@Arg("termIds", () => [Int]) termIds: number[]) {
      return await deleteTerms(termIds);
   }

   @Mutation(() => [Term])
   async updateTermValues(
      @Arg("updateOptions", () => [TermUpdateInput]) updateOptions: [TermUpdateInput]
   ) {
      return updateTermValues({ updateOptions });
   }

   @FieldResolver(() => TermSaturation, { nullable: true })
   async saturation(
      @Root() term: Term,
      @Arg("populate", { nullable: true }) populate?: boolean
   ) {
      return resolveTermSaturation({ term, populate });
   }

   @FieldResolver(() => [[ReviewSessionEntry]], { nullable: true })
   async history(
      @Root() term: Term,
      @Arg("populate", { nullable: true }) populate?: boolean
   ) {
      return resolveTermHistory({ term, populate });
   }
}
