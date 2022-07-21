import { sql } from "../../../db/init";
import { Term, TermWithoutId } from "../../types/Term";

export async function createTerms(terms: TermWithoutId[]) {
   return await sql<[Term?]>`insert into terms ${sql(terms)} returning *`;
}
