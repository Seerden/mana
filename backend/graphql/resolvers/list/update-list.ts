import { UserInputError } from "apollo-server-express";
import { sql as instance, SQL } from "../../../db/init";
import { List, ListLanguageUpdateInput, ListWithTerms } from "../../types/List";
import { Term } from "../../types/Term";
import { listExists } from "./query-by-id";

/** Update the name of a list. */
export async function updateListName(list_id: number, payload: { name: string }) {
   const update = { name: payload.name };
   const condition = { list_id };

   const [list] = await instance<[List?]>`update lists set ${instance(
      update
   )} where ${instance(condition)} returning *`;

   if (!list) throw new Error("Update query did not return a list.");

   return list;
}

/**
 * Update {from|to}_language for a list and all of its terms.
 * TODO: restrict by user_id.
 */
export async function updateListLanguage(
   user_id: number,
   {
      sql = instance,
      list_id,
      to_language,
      from_language,
   }: ListLanguageUpdateInput & { sql?: SQL }
) {
   return sql.begin(async (q) => {
      if (!listExists(user_id, list_id))
         throw new UserInputError("List does not exist, or user does not own this list.");

      const fields: Pick<ListLanguageUpdateInput, "from_language" | "to_language"> = {
         ...(from_language?.length && { from_language }),
         ...(to_language?.length && { to_language }),
      };

      if (Object.values(fields).every((val) => !val))
         throw new UserInputError("No new language specified.");

      const terms = await q<Term[]>`update terms set ${q(
         fields as any
      )} where list_id=${list_id} returning *`;
      const [list] = await q<List[]>`update lists set ${q(
         fields as any
      )} where list_id=${list_id} returning *`;

      if (!list) {
         throw new Error(`No list was updated.`);
      }

      return { ...list, terms } as ListWithTerms;
   });
}
