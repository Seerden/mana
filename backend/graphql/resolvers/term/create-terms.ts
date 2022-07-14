import { sql } from "../../../db/init";
import { NewTerm } from "../../types/input_types/term";

export async function createTerms(terms: NewTerm[]) {
   return await sql`insert into terms ${sql(terms)} returning *`;
}
