import { sql } from "../../../db/init";

export async function deleteTerms(termIds: number[]) {
   return await sql`delete from terms where term_id in ${sql(termIds)}`;
}
