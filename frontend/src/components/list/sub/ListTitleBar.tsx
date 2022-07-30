import { List } from "gql/codegen-output";
import ListDeleteButton from "./ListDeleteButton";
import * as S from "./ListTitleBar.style";

interface ListTitleBarProps {
	handleListTitleBlur: React.FocusEventHandler;
	list: List;
	handleDelete: () => void;
}

function ListTitleBar({ list, handleListTitleBlur, handleDelete }: ListTitleBarProps) {
	return (
		<S.TitleBar>
			<S.TitleBarHeader>
				<S.ListName
					contentEditable
					suppressContentEditableWarning
					onBlur={handleListTitleBlur}
				>
					{list.name}
				</S.ListName>

				<S.ListLanguages>
					({list.from_language} to {list.to_language})
				</S.ListLanguages>
			</S.TitleBarHeader>

			<ListDeleteButton handleDelete={handleDelete} />
		</S.TitleBar>
	);
}

export default ListTitleBar;
