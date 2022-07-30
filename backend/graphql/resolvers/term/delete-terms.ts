import { Term } from "graphql/types/Term";
import { sql } from "../../../db/init";

/** Delete terms by `term_id`, return deleted terms. */
export async function deleteTerms(termIds: number[]) {
   return await sql<[Term]>`delete from terms where term_id in ${sql(
      termIds
   )} returning *`;
}
