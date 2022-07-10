import useList from "hooks/list.hooks/useList";
import ListReviewButtons from "./sub/ListReviewButtons";
import ListTerms from "./sub/ListTerms";
import ListTitleBar from "./sub/ListTitleBar";

function List() {
	const { list, termsToDisplay, filter, handleListTitleBlur, handleDelete, setFilter } =
		useList();

	return (
		<div className="PageWrapper">
			{list && (
				<>
					<ListTitleBar {...{ handleListTitleBlur, list, handleDelete }} />
					<ListReviewButtons />
					<ListTerms {...{ filter, setFilter, termsToDisplay, list }} />
				</>
			)}
		</div>
	);
}

export default List;
