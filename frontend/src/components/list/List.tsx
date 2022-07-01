import useList from "hooks/list.hooks/useList";
import ListReviewButtons from "./ListReviewButtons/ListReviewButtons";
import ListTerms from "./ListTerms/ListTerms";
import ListTitleBar from "./ListTitleBar/ListTitleBar";

function List() {
	const { list, termsToDisplay, filter, handleListTitleBlur, handleDelete, setFilter } =
		useList();

	return (
		<div className="PageWrapper">
			<div className="List">
				{list && (
					<>
						<ListTitleBar {...{ handleListTitleBlur, list, handleDelete }} />
						<ListReviewButtons />
						<ListTerms {...{ filter, setFilter, termsToDisplay, list }} />
					</>
				)}
			</div>
		</div>
	);
}

export default List;
