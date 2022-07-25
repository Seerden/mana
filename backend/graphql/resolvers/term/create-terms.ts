import { sql as instance, SQL } from "../../../db/init";
import { Term, TermWithoutId } from "../../types/Term";

type Args = {
   sql?: SQL;
   terms: TermWithoutId[];
};

export async function createTerms({ sql = instance, terms }: Args) {
   return await sql<[Term?]>`insert into terms ${sql(terms)} returning *`;
}
