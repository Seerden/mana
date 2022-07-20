import { sql } from "../../../db/init";
import { List } from "../../types/List";

/** Fetch all of a user's lists _without_ joining terms. */
export async function queryListsByUser(user_id: number) {
   return (await sql`select * from lists where user_id = ${user_id}`) as List[];
}

/**
 * Fetch all of a user's lists _with_ terms included. Note that we typically
 * only want to fetch a select subset of a user's lists. For that, see
 * `queryListsById`.
 *
 * TODO: I haven't the faintest clue what the actual output type of this is.
 * Revisit it once we actually get the application working again. :)
 */
export async function queryListsWithTermsByUser(user_id: number) {
   return await sql`
      select jsonb_agg(distinct to_jsonb(l.*)) as list, jsonb_agg(to_jsonb(t.*)) as terms from lists l 
      inner join terms t 
         on l.list_id = t.list_id
         and l.user_id = ${user_id}
      group by l.list_id
   `;
}
