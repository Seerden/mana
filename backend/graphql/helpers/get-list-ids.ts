import { sql as instance } from "../../db/init";

/** Returns a list of `list_id` of the lists in any of the sets with `setIds`. */
export async function getListIdsFromSetIds(setIds: number[], sql = instance) {
   const rows = await sql<{ list_id: number }[]>`
      select list_id from lists l where l.set_ids::numeric[] && ${setIds}::numeric[]
   `;

   return rows.map((row) => row.list_id);
}
