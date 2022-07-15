import { sql } from "../../../db/init";
import { NewList } from "../../types/input_types/list";
import { List } from "../../types/List";
import { createTerms } from "../term/create-terms";

export async function createList(newList: NewList) {
   const { user_id, from_language, name, to_language, terms } = newList;

   // Note that we don't really have to do this, since postgres would just
   // ignore the unused fields, but I think this is clearer and cleaner.
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

      const insertedTerms = await createTerms(
         terms.map((t) => ({ ...t, list_id: insertedList.list_id }))
      );

      return { list: insertedList, terms: insertedTerms };
   });
}
