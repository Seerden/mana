import { sql } from "../../../db/init";
import type { ListId } from "../../types/List";
import type { UserId } from "../../types/User";

export async function queryListsById(user_id: number, ids: number[]) {
   return await sql`select * from lists where user_id = ${user_id} and list_id in ${sql(
      ids
   )} `;
}

/**
 * Small abstraction around queryListsById that queries one list by
 * (user_id, list_id) to see whether or not it exists.
 *
 * @usage use this function to verify whether a user/list combination exists
 * before e.g. attempting to perform an update.
 */
export async function listExists(user_id: UserId, list_id: ListId) {
   const [list] = await queryListsById(user_id, [list_id]);

   return !!list;
}
