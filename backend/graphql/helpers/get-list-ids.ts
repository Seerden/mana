import { sql as instance } from "../../db/init";

/**
 * Get the `list_id`s from all of the sets by `setIds`
 * TODO: Set functionality isn't implemented yet, so this cannot be tested yet
 * (and usage is also not supported).
 */

export async function getListIdsFromSetIds(setIds: number[], sql = instance) {
   const rows = await sql<{ list_id: number }[]>`
      select list_id from lists l where l.set_ids::numeric[] && ${setIds}::numeric[]
   `;

   return rows.map((row) => row.list_id);
}
