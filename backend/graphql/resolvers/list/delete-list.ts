import { sql } from "../../../db/init";

// TODO: trycatch, typing
export async function deleteListsById(listIds: number[]) {
   return await sql.begin(async (sql) => {
      const [list] = await sql`delete from lists where list_id in ${sql(listIds)}`;
      const terms = await sql`delete from terms where list_id in ${sql(listIds)}`;

      return { list, terms };
   });
}

// TODO: trycatch, typing
export async function deleteListsByUser(user_id: number) {
   return await sql`delete from lists where user_id = ${user_id}`;
}
