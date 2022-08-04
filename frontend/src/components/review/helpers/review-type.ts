import { Location } from "history";
import { ReviewParamsInput } from "../../../gql/codegen-output";

const allowedQueryParams = ["list_ids", "set_ids", "term_ids"];

enum PageTypes {
	LIST = "list",
	SET = "set",
}

function getPageType({ pathname }: Location, params: Record<string, string>) {
	const subPaths = pathname
		.split("/")
		// Have to filter these in case e.g. a user's username contains 'list'
		.filter((sub) => !Object.values(params).includes(sub));

	if (subPaths.includes(PageTypes.LIST)) return PageTypes.LIST;
	if (subPaths.includes(PageTypes.SET)) return PageTypes.SET;

	return;
}

/**
 * Build a ReviewParams object that returns:
 * - maybe each of listIds, setIds or termIds,
 * - and maybe one or more of {min, max}_saturation. This can then be used in
 * PreReview to allow the user to more quickly determine the list of terms
 * they'll be reviewing.
 *
 * @note This is a naive parser (it can return multiple of {listIds, setIds,
 * termIds} and also overlapping {min, max} saturation thresholds). We should be
 * checking this client-side, so it's not strictly necessary to do more than
 * this, but we do a parse-pass in `makeReviewParams` anyway.
 */
export function makeNaiveReviewParams(search: URLSearchParams) {
	return Array.from(search.entries())
		.filter(([k, v]) => allowedQueryParams.includes(k))
		.reduce((acc, [k, v]: [k: keyof ReviewParamsInput, v: string]) => {
			let newValue: number | number[];

			if (k.includes("_ids")) {
				if (k in acc) {
					newValue = (acc[k] as number[]).concat(+v); // can append to existing array
				} else {
					newValue = [+v]; // have to create array since we initialize as {}
				}
			} else {
				newValue = +v; // just a number
			}

			return {
				...acc,
				[k]: newValue,
			};
		}, {} as ReviewParamsInput);
}

/**
 * Parse the return from `makeNaiveReviewParams()`:
 * - remove setIds if on a list page, and vice versa
 * - set setIds or listIds from url if on a list or set page
 */
export function makeReviewParams(
	search: URLSearchParams,
	location: Location,
	params: Record<string, string>
) {
	const naiveParams = makeNaiveReviewParams(search);
	const reviewParams = JSON.parse(JSON.stringify(naiveParams)) as ReviewParamsInput;
	const pageType = getPageType(location, params);

	if (pageType === PageTypes.LIST) {
		reviewParams.list_ids = [+params.id];
		delete reviewParams.set_ids;
		delete reviewParams.term_ids;
	} else if (pageType === PageTypes.SET) {
		reviewParams.set_ids = [+params.id];
		delete reviewParams.list_ids;
		delete reviewParams.term_ids;
	}

	return reviewParams;
}
