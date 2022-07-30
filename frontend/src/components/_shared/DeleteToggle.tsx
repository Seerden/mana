import { useState } from "react";
import * as S from "./DeleteToggle.style";

export default function DeleteToggleButton({
	handler,
	initialText,
}: {
	handler?: (args?: any) => void;
	initialText: string;
}) {
	const [confirming, setConfirming] = useState<boolean>(false);

	return (
		<S.DeleteButtonWrapper>
			{!confirming ? (
				<S.DeleteButton onClick={() => setConfirming(true)}>
					{initialText}
				</S.DeleteButton>
			) : (
				<>
					<S.ConfirmDeleteLabel>Delete?</S.ConfirmDeleteLabel>
					<S.ConfirmDeleteButton confirm onClick={() => handler?.()}>
						Yes
					</S.ConfirmDeleteButton>
					<S.ConfirmDeleteButton onClick={() => setConfirming(false)}>
						No
					</S.ConfirmDeleteButton>
				</>
			)}
		</S.DeleteButtonWrapper>
	);
}
