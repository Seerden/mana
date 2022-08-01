import * as S from "./SettingsButton.style";

type ButtonProps = {
	value: Direction | number; // Direction if `direction` button, number if `n` button
	selected?: boolean;
	onClick: (args?: any) => void;
	field: "n" | "direction";
};

export default function SettingsButton({ value, onClick, selected, field }: ButtonProps) {
	return (
		<S.SettingsButton
			type="button"
			field={field}
			value={value}
			selected={selected}
			onClick={() => {
				onClick();
			}}
		/>
	);
}
