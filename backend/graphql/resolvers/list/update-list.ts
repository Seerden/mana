import { sql } from "../../../db/init";
import { List } from "../../types/List";

// Only current usecase is updating list names, so let's implement it as such,
// for now

/**
 * Update the name of a list..
 * @note `list_id` should be unique, so we shouldn't need to involve e.g.
 * `user_id`.
 */
export async function updateListName(list_id: number, payload: { name: string }) {
   const update = { name: payload.name };
   const condition = { list_id };

   return await sql<[List?]>`update lists set ${sql(update)} where ${sql(
      condition
   )} returning *`;
}
