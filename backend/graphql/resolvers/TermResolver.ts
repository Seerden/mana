import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { Term, TermUpdateInput, TermWithoutId } from "../types/Term";
import { createTerms } from "./term/create-terms";
import { deleteTerms } from "./term/delete-terms";
import { updateTermValues } from "./term/update-terms";

// We currently don't query terms by themselves,
//  only as part of their parent list's queries,
//   but this might change in the future

@Resolver()
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

   // TODO: implement mutations for updating terms. Review-related mutations
   // will be in ReviewSessionResolver from now on.
}
