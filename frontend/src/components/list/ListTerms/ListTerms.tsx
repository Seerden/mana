import SaturationFilter from "components/SaturationFilter/SaturationFilter";
import * as S from "./ListTerms.style";

const ListTerms = ({ filter, setFilter, termsToDisplay, list }) => {
	const showingString = filter.saturation.level
		? "Showing filtered list"
		: "Showing all terms";

	return (
		<S.ListTerms>
			<S.Header>Terms</S.Header>

			<S.FilterInfo>
				{list && list.sessions?.length > 0 && (
					<SaturationFilter {...{ filter, setFilter }} />
				)}
				<S.FilterString>{showingString}</S.FilterString>
			</S.FilterInfo>

			{/* TODO: Loading terms... isn't styuled, but AllFiltered _is_. Why not use a variable for the string to display, and display both _with_ styles? */}
			{!termsToDisplay && <>Loading terms...</>}

			{termsToDisplay?.length === 0 && (
				<S.AllFiltered>All terms were filtered out</S.AllFiltered>
			)}

			{termsToDisplay?.length > 0 && termsToDisplay}
		</S.ListTerms>
	);
};

export default ListTerms;
