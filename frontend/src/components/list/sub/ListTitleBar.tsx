import { List } from "gql/codegen-output";
import DeleteToggleButton from "../../_shared/DeleteToggle";
import * as S from "./ListTitleBar.style";

interface ListTitleBarProps {
	handleListTitleBlur: React.FocusEventHandler;
	handleListTitleChange: React.ChangeEventHandler;
	list: List;
	handleDelete: () => void;
}

function ListTitleBar({
	list,
	handleListTitleBlur,
	handleListTitleChange,
	handleDelete,
}: ListTitleBarProps) {
	return (
		<S.TitleBar>
			<S.TitleBarHeader>
				<div style={{ position: "relative" }}>
					<S.ListName
						type="text"
						onChange={handleListTitleChange}
						onBlur={handleListTitleBlur}
						value={list.name}
					/>
					<S.EditIcon title="Change the list's title by clicking it" />
				</div>

				<S.ListLanguages>
					({list.from_language} to {list.to_language})
				</S.ListLanguages>
			</S.TitleBarHeader>
			<DeleteToggleButton handler={handleDelete} initialText={"Delete list"} />
		</S.TitleBar>
	);
}

export default ListTitleBar;
