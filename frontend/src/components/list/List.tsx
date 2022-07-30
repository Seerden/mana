import useList from "components/list/hooks/useList";
import { Page } from "../../helpers/theme/snippets";
import { useListUpdate } from "./hooks/useListUpdate";
import ListReviewButtons from "./sub/ListReviewButtons";
import ListTerms from "./sub/ListTerms";
import ListTitleBar from "./sub/ListTitleBar";

function List() {
	const { handleListTitleBlur, handleDelete, handleListTitleChange } = useListUpdate();
	const { list } = useList();

	if (!list) return <></>;

	return (
		<Page>
			<ListTitleBar
				list={list}
				handleListTitleChange={handleListTitleChange}
				handleListTitleBlur={handleListTitleBlur}
				handleDelete={handleDelete}
			/>

			<ListReviewButtons />

			<ListTerms list={list} />
		</Page>
	);
}

export default List;
