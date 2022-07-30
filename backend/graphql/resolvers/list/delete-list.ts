import { sql } from "../../../db/init";
import { List, ListAndTerms } from "../../types/List";
import { Term } from "../../types/Term";

export async function deleteListsById(
   user_id: number,
   listIds: number[]
): Promise<ListAndTerms> {
   return await sql.begin(async (sql) => {
      // NOTE: deleting terms and list separately is easier than writing a
      // complex query.
      const terms = await sql<[Term?]>`delete from terms where list_id in ${sql(
         listIds
      )} and user_id=${user_id} returning *`;
      const [list] = await sql<[List?]>`delete from lists where list_id in ${sql(
         listIds
      )} and user_id=${user_id} returning *`;

      return { list, terms };
   });
}

// TODO: add sql options object for testing
export async function deleteListsByUser(user_id: number) {
   return sql<[List?]>`delete from lists where user_id = ${user_id} returning *`;
}
