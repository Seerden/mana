import { sql as instance, SQL } from "../../../db/init";
import { Term, TermSaturation } from "../../types/Term";

type Args = {
   term: Term;
   populate?: boolean;
   sql?: SQL;
};

/**
 * `term.saturation` field resolver function.
 *
 * @usage only to be used inside TermResolver's `saturation` FieldResolver()
 */
export async function resolveTermSaturation({ term, populate, sql = instance }: Args) {
   if (!populate) return;

   const [saturation] = await sql<[TermSaturation]>`
      select * from term_saturation where 
         term_id = ${term.term_id}
   `;

   return saturation;
}
