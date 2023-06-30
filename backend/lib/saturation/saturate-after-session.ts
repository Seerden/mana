import { sql as instance, SQL } from "../../db/init";
import {
   getLatestSessionsForTerms,
   parseSessionEntriesWithMeta,
} from "../../graphql/resolvers/review-session/get-sessions";
import { saturateSeededTerm } from "./saturate-seeded";
import { saturateUnseededTerm } from "./saturate-unseeded";

/**
 * - fetch 3 most recent sessions in `direction` for all termIds
 * - parse each `session` from the above response to ParsedSession
 * - compute new saturation level in `direction` for each of termIds
 *
 * @usage Intended to be called from within the `createSession` pipeline, this
 * way we ensure that this correctly evaluates the latest review session.
 */
export async function getNewSaturationLevels(
   termIds: number[],
   direction: "forwards" | "backwards",
   sql: SQL = instance
) {
   // get 3 latest sessions (in `direction`) for each term in term_ids
   const latest = await getLatestSessionsForTerms({ sql, termIds, direction });

   // map the session (= PassFail[]) of each item in `latest` to ParsedSession
   const parsedLatest = latest.map((x) => parseSessionEntriesWithMeta(x));

   // loop over all terms. filter parsedLatest by term and then determine the
   // term's new saturation level
   const saturationUpdate = termIds.map((term_id) => {
      const [current, previous, secondToLast] = parsedLatest.filter(
         (x) => x.term_id === term_id
      );

      // If term doesn't have saturation yet, but it's been reviewed 3 times,
      // treat it as unseeded term and saturate.
      if (typeof current?.saturation?.[direction] !== "number") {
         if (secondToLast) {
            return {
               term_id,
               [direction]: saturateUnseededTerm({ current }),
            };
         } else {
            return;
         }
      }

      // If term _does_ have a saturation level, treat it as a seeded term.
      return saturateSeededTerm(direction, {
         current,
         previous,
         secondToLast,
      });
   });

   return saturationUpdate;
}
