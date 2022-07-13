import { sql } from "../../../db/init";
import { List } from "../../types/List";
import { Term } from "../../types/Term";

export function resolveTerms(list: List, populate?: boolean) {
   if (!populate) return [];

   return sql<[Term?]>`select * from terms where list_id = ${list.list_id}`;
}
