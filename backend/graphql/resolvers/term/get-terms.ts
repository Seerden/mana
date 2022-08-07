import { sql as instance, SQL } from "../../../db/init";
import { getListIdsFromSetIds } from "../../helpers/get-list-ids";
import { ReviewParamsInput, Term } from "../../types/Term";

type Options = {
   filter: ReviewParamsInput;
   sql?: SQL;
};

const idsFields: Array<keyof Options["filter"]> = ["term_ids", "list_ids", "set_ids"];

/**
 * Given a filter that specifies termIds, listIds and/or setIds, retrieve a list
 * terms belonging to these ids. If multiple ids fields specified, prioritize
 * termIds > listIds > setIds.
 */
export async function queryTermsForReview({ filter, sql = instance }: Options) {
   const idsField = idsFields.find((field) => filter[field]?.length);

   switch (idsField) {
      case "term_ids":
         return await sql<Term[]>`
            select * from terms 
            where term_id in ${sql(filter?.[idsField] ?? [])}
         `;
      case "list_ids":
      case "term_ids":
         return await getTermsFromSuperIds({ [idsField]: filter[idsField] });
      default:
         return [];
   }
}

/**
 * Get all terms belonging to any set in setIds, or any list in listIds.
 * If both setIds and listIds are specified, setIds takes priority and listIds
 * is ignored.
 */
export async function getTermsFromSuperIds({
   list_ids = [],
   set_ids = [],
   sql = instance,
}: {
   sql?: SQL;
   list_ids?: number[];
   set_ids?: number[];
}) {
   const ids = set_ids.length ? await getListIdsFromSetIds(set_ids) : list_ids;

   if (!ids.length) return [];

   return await sql<Term[]>`
         select * from terms where ${ids}::integer[] && array[list_id]::integer[]
      `;
}
