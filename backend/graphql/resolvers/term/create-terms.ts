import { sql } from "../../../db/init";
import { NewTerm } from "../../types/input_types/term";
import { Term } from "../../types/Term";

export async function createTerms(terms: NewTerm[]) {
   return await sql<[Term?]>`insert into terms ${sql(terms)} returning *`;
}
