import { sql } from "../../../db/init";
import { List, NewListWithTerms } from "../../types/List";
import { TermWithoutId } from "../../types/Term";
import { createTerms } from "../term/create-terms";

export async function createList(user_id: number, newList: NewListWithTerms) {
   const { from_language, name, to_language, terms } = newList;

   // NOTE: we don't really have to do this, since postgres would ignore the
   // unused fields anyway, but I think this is clearer and cleaner.
   const listFields = {
      user_id,
      from_language,
      name,
      to_language,
   };

   return await sql.begin(async (sql) => {
      const [insertedList] = await sql<[List?]>`
            insert into lists ${sql(listFields)} returning *
         `;

      if (!insertedList) {
         sql`abort`;
      }

      const termsToInsert: TermWithoutId[] = terms.map((t) => ({
         ...t,
         list_id: insertedList.list_id,
         user_id,
      }));

      const insertedTerms = await createTerms({ sql, terms: termsToInsert });

      return { list: insertedList, terms: insertedTerms };
   });
}
