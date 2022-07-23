import { Arg, FieldResolver, Int, Mutation, Resolver, Root } from "type-graphql";
import { ReviewSessionEntry } from "../types/ReviewSessionEntry";
import { Term, TermSaturation, TermUpdateInput, TermWithoutId } from "../types/Term";
import { createTerms } from "./term/create-terms";
import { deleteTerms } from "./term/delete-terms";
import { resolveTermHistory } from "./term/resolve-history";
import { resolveTermSaturation } from "./term/resolve-saturation";
import { updateTermValues } from "./term/update-terms";

// We currently don't query terms by themselves,
//  only as part of their parent list's queries,
//   but this might change in the future

@Resolver(() => Term)
export class TermResolver {
   @Mutation(() => [Term])
   async createTerms(@Arg("terms", () => [TermWithoutId]) terms: TermWithoutId[]) {
      return await createTerms(terms);
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

   @FieldResolver(() => [ReviewSessionEntry], { nullable: true })
   async history(
      @Root() term: Term,
      @Arg("populate", { nullable: true }) populate?: boolean
   ) {
      return resolveTermHistory({ term, populate });
   }
}
