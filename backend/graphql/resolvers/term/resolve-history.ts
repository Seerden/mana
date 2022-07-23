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

   return sql<[ReviewSessionEntry]>`
      select * from review_session_entries where term_id=${term.term_id}
   `;
}
