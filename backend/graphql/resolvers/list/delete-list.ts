import { sql } from "../../../db/init";
import { List, ListAndTerms } from "../../types/List";
import { Term } from "../../types/Term";

// TODO: trycatch, typing
export async function deleteListsById(listIds: number[]): Promise<ListAndTerms> {
   return await sql.begin(async (sql) => {
      // TODO: currently, we don't have an `on delete cascade` definition in
      // `lists`, so terms have to be deleted _first_, and then lists.
      const terms = await sql<[Term?]>`delete from terms where list_id in ${sql(
         listIds
      )} returning *`;
      const [list] = await sql<[List?]>`delete from lists where list_id in ${sql(
         listIds
      )} returning *`;

      return { list, terms };
   });
}

// TODO: trycatch, typing
export async function deleteListsByUser(user_id: number) {
   return await sql`delete from lists where user_id = ${user_id}`;
}
