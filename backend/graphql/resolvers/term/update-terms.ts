import { sql as instance, SQL } from "../../../db/init";
import { Term } from "../../types/Term";

type TermValueUpdateOptions = {
   term_id: Term["term_id"];
   from_value?: string;
   to_value?: string;
};

/**
 * Filter a TermUpdateOptions[], removing entries where neither `from_value` nor
 * `to_value` are valid.
 */
function filterTermValueUpdateOptions(options: TermValueUpdateOptions[]) {
   return options.filter(({ from_value, to_value }) =>
      [from_value, to_value].some((val) => val?.length)
   );
}

/** Update term.{from_value and/or to_value} for any number of terms. */
export async function updateTermValues({
   sql = instance,
   updateOptions,
}: {
   sql?: SQL;
   updateOptions: TermValueUpdateOptions[];
}) {
   const result = await sql.begin((q) => {
      return filterTermValueUpdateOptions(updateOptions).map(
         ({ from_value, to_value, term_id }) => q`
         update terms set 
            ${sql({
               ...(from_value?.length && { from_value }),
               ...(to_value?.length && { to_value }),
            })}
         where term_id=${term_id} returning *
      `
      );
   });

   return result.flat() as Term[]; // Update result is typically an array, so we're receiving Term[][], while we want Term[]
}
