import { memo, useState } from "react";
import { makeHistoryElement } from "./makeHistoryElement";
import * as S from "./TermHistory.style";

const TermHistory = memo(({ history }: { history: any[] }) => {
	const [expand, setExpand] = useState(false);

	const histEl = makeHistoryElement(history).reverse();

	return (
		<>
			<S.History>
				<S.Header>
					<S.Description>
						You've reviewed this term {histEl.length} time
						{histEl.length === 1 ? "" : "s"}
					</S.Description>
					{histEl.length > 1 && (
						<S.ExpandButton onClick={() => setExpand(!expand)}>
							{!expand ? "Showing one" : "Showing all"}
						</S.ExpandButton>
					)}
				</S.Header>
				<S.HistoryContent>{expand ? histEl : histEl[0]}</S.HistoryContent>
			</S.History>
		</>
	);
});

export default TermHistory;
