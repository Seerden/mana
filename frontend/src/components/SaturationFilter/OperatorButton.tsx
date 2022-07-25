import { operators } from "./helpers/operators";
import * as S from "./SaturationFilter.style";

export type Operator = `${operators}`;

type OperatorButtonProps = {
	operator: Operator;
	onClick?: (operator: Operator) => void;
};

export default function OperatorButton({ operator, onClick }: OperatorButtonProps) {
	return (
		<S.OperatorButton
			key={operator}
			value={operator}
			onClick={() => onClick?.(operator)}
		>
			<span>{operator}</span>
		</S.OperatorButton>
	);
}
