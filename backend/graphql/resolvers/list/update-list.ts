import { sql } from "../../../db/init";

// Only current usecase is updating list names, so let's implement it as such,
// for now

// TODO: trycatch, typing
export async function updateListName(list_id: number, payload: { name: string }) {
   return await sql`update lists set name = ${payload.name} where list_id = ${list_id}`;
}
