import { operators } from "./helpers/operators";
import * as S from "./SaturationFilter.style";

type InitialButtonProps = {
	onResetClick?: () => void;
	onStartClick?: () => void;
	color?: string;
};

export function Initial({ onStartClick, onResetClick, color }: InitialButtonProps) {
	return (
		<S.FilterLabelButton onClick={() => onStartClick?.()} borderAndShadowColor={color}>
			Filter by saturation level
			<S.ResetButton type="button" value="Reset" onClick={() => onResetClick?.()} />
		</S.FilterLabelButton>
	);
}

export type Operator = `${operators}`;

type OperatorButtonProps = {
	operator: Operator;
	onClick?: () => void;
};

export default function OperatorButton({ operator, onClick }: OperatorButtonProps) {
	return (
		<S.OperatorButton key={operator} value={operator} onClick={() => onClick?.()}>
			<span>{operator}</span>
		</S.OperatorButton>
	);
}
