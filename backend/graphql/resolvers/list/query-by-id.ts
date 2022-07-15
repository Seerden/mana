import { sql } from "../../../db/init";

export async function queryListsById(user_id: number, ids: number[]) {
   return await sql`select * from lists where user_id = ${user_id} and list_id in ${sql(
      ids
   )} `;
}
