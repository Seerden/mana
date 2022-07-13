import { ExpressContext } from "apollo-server-express";
import { sql } from "../../../db/init";

export async function queryListsById(ids: number[], { req }: Partial<ExpressContext>) {
   const userId = req.session.userId!;
   return await sql`select * from lists where user_id = ${userId} and list_id in ${sql(
      ids
   )} `;
}
