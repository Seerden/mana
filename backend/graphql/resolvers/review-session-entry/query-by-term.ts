import { sql } from "../../../db/init";
import { ReviewSessionEntry } from "../../types/ReviewSessionEntry";

export async function getReviewEntriesForTerms(termIds: number[]) {
   const name = "entries"; // matches jsonb_agg(e.*) __entries__

   const entries = await sql<
      [{ term_id: number; [name]: ReviewSessionEntry[] }]
   >`select term_id, jsonb_agg(e.*) entries from review_session_entries e where term_id in ${sql(
      termIds
   )} group by term_id`;

   return entries;
}
