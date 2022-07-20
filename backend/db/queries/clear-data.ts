import { sql } from "../init";

export async function clearDatabaseData() {
   await sql`truncate table users cascade`;
}
