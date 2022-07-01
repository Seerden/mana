import useList from "hooks/list.hooks/useList";
import { memo } from "react";
import ListReviewButtons from "./ListReviewButtons/ListReviewButtons";
import ListTerms from "./ListTerms/ListTerms";
import ListTitleBar from "./ListTitleBar/ListTitleBar";

const List = memo((props) => {
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
});

export default List;
