import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { Term, TermWithoutId } from "../types/Term";
import { createTerms } from "./term/create-terms";
import { deleteTerms } from "./term/delete-terms";

// We currently don't query terms by themselves,
//  only as part of their parent list's queries,
//   but this might change in the future

@Resolver()
export class TermResolver {
   @Mutation(() => [Term])
   async createTerms(@Arg("terms", () => [TermWithoutId]) terms: TermWithoutId[]) {
      return await createTerms(terms);
   }

   // TODO: does this return Term[]? Or does deleting return another type of object?
   @Mutation(() => [Term])
   async deleteTerms(@Arg("termIds", () => [Int]) termIds: number[]) {
      return await deleteTerms(termIds);
   }

   // TODO: implement mutations for updating terms. Review-related mutations
   // will be in ReviewSessionResolver from now on.
}
