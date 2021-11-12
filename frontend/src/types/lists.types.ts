import { List } from "gql/codegen-output";
import ListsItem from "../components/lists/ListsItem";

export type ColorType =
	| "seagreen"
	| "teal"
	| "yellowgreen"
	| "orange"
	| "orangered"
	| "#333";

export interface ListsElement {
	name: List["name"];
	state: any;
	lastReviewed: List["lastReviewed"];
	created: List["created"];
	element: typeof ListsItem;
}

export type UseListsReturn = {
	lists: Array<List> | undefined;
	filteredListsElement: any;
	handleFilterChange: React.ChangeEventHandler<HTMLInputElement>;
	handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
	filter: string;
	sortBy: string;
};
