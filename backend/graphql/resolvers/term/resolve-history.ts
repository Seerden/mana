import { sql as instance, SQL } from "../../../db/init";
import { ReviewSessionEntry } from "../../types/ReviewSessionEntry";

import { Term } from "../../types/Term";

// NOTE: exact same as Args in resolve-saturation. Consider exporting this type
type Args = {
   term: Term;
   populate?: boolean;
   sql?: SQL;
};

export async function resolveTermHistory({ term, populate, sql = instance }: Args) {
   if (!populate) return;

   return (
      await sql<[{ session: [ReviewSessionEntry] }]>`
      select jsonb_agg(to_jsonb(r.*)) session from (
         select e.*, extract(epoch from e.created_at) as created_at from review_session_entries e where term_id=${term.term_id}
      ) r group by r.review_session_id
   `
   ).map((x) => x.session);
}
