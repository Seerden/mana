import { useState, memo } from "react";
import "./TermHistory.scss";
import { makeHistoryElement } from "./makeHistoryElement";

const TermHistory = memo(({ history }: { history: any[] }) => {
	const [expand, setExpand] = useState(false);

	const histEl = makeHistoryElement(history).reverse();

	return (
		<>
			<div className="TermHistory">
				<div className="TermHistory__header">
					<div className="TermHistory__desc">
						You've reviewed this term {histEl.length} time
						{histEl.length === 1 ? "" : "s"}
					</div>
					{histEl.length > 1 && (
						<button className="TermHistory__expand" onClick={() => setExpand(!expand)}>
							{!expand ? "Showing one" : "Showing all"}
						</button>
					)}
				</div>
				<div className="TermHistory__content">{expand ? histEl : histEl[0]}</div>
			</div>
		</>
	);
});

export default TermHistory;
