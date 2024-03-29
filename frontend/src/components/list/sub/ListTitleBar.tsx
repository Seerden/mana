import { List } from "gql/codegen-output";
import ListDeleteButton from "./ListDeleteButton";
import * as S from "./ListTitleBar.style";

interface ListTitleBarProps {
	handleListTitleBlur: React.FocusEventHandler;
	list: List;
	handleDelete: () => void;
}

const ListTitleBar = ({ handleListTitleBlur, list, handleDelete }: ListTitleBarProps) => {
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
					({list.from} to {list.to})
				</S.ListLanguages>
			</S.TitleBarHeader>

			<ListDeleteButton {...{ handleDelete }} />
		</S.TitleBar>
	);
};

export default ListTitleBar;
