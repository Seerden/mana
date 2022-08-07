import { WithSQL } from "../../../custom_types/with-sql.types";
import { sql as instance } from "../../../db/init";
import { SessionEntriesWithMeta } from "../../../lib/saturation/saturation.types";
import { ReviewSession } from "../../types/ReviewSession";

/**
 * For each of the termIds given, return the latest 3 review sessions. Returns
 * an array where each row represents one session for one term. So to get
 * meaningful results, this array still has to be filtered.
 */
// TODO: implement unit tests.
export async function getLatestSessionsForTerms({
   sql = instance,
   termIds,
   direction,
}: WithSQL<{ termIds: number[]; direction: ReviewSession["direction"] }>) {
   return await sql<SessionEntriesWithMeta[]>`
   select review_session_id, sq.term_id, to_json(sat.*) saturation, session from  (
      select row_number() over (
         partition by term_id order by review_session_id desc
      ), aggregated.*
   
      from (
         select 
            r.review_session_id, 
            r.term_id, 
            jsonb_agg(r.*) session

         from (
            select 
               ee.*,
               extract(epoch from created_at)*1000 created_at
            from review_session_entries ee
         ) r
         
         where r.term_id=any(${termIds}::numeric[]) 
         and r.direction=${direction}
         group by (r.term_id, r.review_session_id) 
         order by r.term_id
      ) aggregated
   ) sq
   left join term_saturation sat on sat.term_id = sq.term_id
   where sq.row_number <= 3
   `;
}
