import SaturationFilter from "components/SaturationFilter/SaturationFilter";
import { List } from "../../../gql/codegen-output";
import { useListFilter } from "../hooks/useListFilter";
import ListTerm from "./ListTerm";
import * as S from "./ListTerms.style";

type ListTermsProps = {
	list: List;
};

function ListTerms({ list }: ListTermsProps) {
	const { termFilter, visibleTermIds } = useListFilter();

	const showingString =
		typeof termFilter.value === "number"
			? "Showing filtered list"
			: "Showing all terms";

	return (
		<S.ListTerms>
			<S.Header>Terms</S.Header>

			<S.FilterInfo>
				{/* {!!list.last_reviewed && <SaturationFilter {...{ filter, setFilter }} />} */}
				{<SaturationFilter />}
				<S.FilterString>{showingString}</S.FilterString>
			</S.FilterInfo>

			{/* TODO: Loading terms... isn't styuled, but AllFiltered _is_. Why not use a variable for the string to display, and display both _with_ styles? */}
			{!visibleTermIds && <>Loading terms...</>}

			{visibleTermIds?.length === 0 && (
				<S.AllFiltered>All terms were filtered out</S.AllFiltered>
			)}

			{visibleTermIds?.length > 0 &&
				list.terms
					.filter((t) => visibleTermIds.includes(t.term_id))
					.map((t) => <ListTerm key={t.term_id} term={t} idx={t.term_id} />)}
		</S.ListTerms>
	);
}

export default ListTerms;
