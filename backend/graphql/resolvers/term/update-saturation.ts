import { sql as instance, SQL } from "../../../db/init";
import { TermSaturation } from "../../types/Term";

/** Update one or multiple term saturation values in the database. */
// TODO: unit test this
// TODO: make arguments an object to fit codebase conventions
export async function updateTermSaturation(
   update: Omit<TermSaturation, "last_updated">[],
   sql: SQL = instance
) {
   // Pipeline all the updates so they go in one transaction.
   return sql.begin((q) =>
      update.map((u) => {
         // Filter out null values, since we don't want to manually set
         // saturation values to null. This makes sure objects like {forwards:
         // null, backwards: 1} are filtered to {backwards: 1}}
         const updateObj = Object.entries(u).reduce((acc, [k, v]) => {
            if (typeof v === "number" /* accounts for term_id and saturation values */) {
               acc[k] = v;
            }

            return acc;
         }, {} as TermSaturation);

         // Don't even send the update if neither forwards nor backwards saturation
         // are specified.
         if (["forwards", "backwards"].every((x) => typeof updateObj[x] !== "number")) {
            return;
         }

         return q`
            update term_saturation 
            set ${q({ ...updateObj, last_updated: new Date() } as any)} 
            where term_id=${u.term_id}
            returning *
         `;
      })
   );
}
