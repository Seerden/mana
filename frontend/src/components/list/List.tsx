import useList from "components/list/hooks/useList";
import { useListUpdate } from "./hooks/useListUpdate";
import ListReviewButtons from "./sub/ListReviewButtons";
import ListTerms from "./sub/ListTerms";
import ListTitleBar from "./sub/ListTitleBar";

function List() {
	const { handleListTitleBlur, handleDelete } = useListUpdate();
	const { list } = useList();

	if (!list) return <></>;

	return (
		<div className="PageWrapper">
			<ListTitleBar
				list={list}
				handleListTitleBlur={handleListTitleBlur}
				handleDelete={handleDelete}
			/>

			<ListReviewButtons />

			<ListTerms list={list} />
		</div>
	);
}

export default List;
