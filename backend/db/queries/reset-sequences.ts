import { sql } from "../init";

type Table =
   | "users"
   | "terms"
   | "lists"
   | "review_sessions"
   | "review_session_entries"
   | "term_saturation";

const tableWithId: Partial<{ [k in Table]: string }> = {
   users: "user_id",
   lists: "list_id",
   terms: "term_id",
   review_sessions: "review_session_id",
   review_session_entries: "review_entry_id",
};

export async function resetSequences() {
   return sql.begin(async (q) => {
      const results = [];
      for (const [table, seq] of Object.entries(tableWithId)) {
         const seqString = `${table}_${seq}_seq`;
         const resetResponse = await q`alter sequence ${q(seqString)} restart with 1`;
         results.push({ [seqString]: true });
      }
      return results;
   });
}
