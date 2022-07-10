import dayjs from "dayjs";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../../../helpers/theme/colors";
import { timeSince } from "../../../helpers/time";
import PassfailIcon from "../../_shared/PassfailIcon";
import * as S from "./TermHistory.style";

const TermHistory = ({ history }: { history: any[] }) => {
	const [expand, setExpand] = useState(false);

	const historyElements = [...history]
		.reverse()
		.map((element) => <HistoryElement historyEntry={element} key={uuidv4()} />);

	return (
		<>
			<S.History>
				<S.Header>
					<S.Description>
						You've reviewed this term {historyElements.length} time
						{historyElements.length === 1 ? "" : "s"}
					</S.Description>
					{historyElements.length > 1 && (
						<S.ExpandButton onClick={() => setExpand(!expand)}>
							{!expand ? "Showing one" : "Showing all"}
						</S.ExpandButton>
					)}
				</S.Header>
				{historyElements.length > 0 && (
					<S.HistoryContent>
						{expand ? historyElements : historyElements[0]}
					</S.HistoryContent>
				)}
			</S.History>
		</>
	);
};

export default TermHistory;

function HistoryElement({ historyEntry }) {
	return (
		<S.HistorySession>
			<S.HistorySessionBlock>
				<S.Direction>
					{historyEntry.direction === "forwards" ? (
						<BiArrowToRight
							title="Reviewed front to back"
							fill={colors.blue.main}
							size={18}
						/>
					) : (
						<BiArrowToLeft
							title="Reviewed back to front"
							// TODO: add to green theme value
							fill="limegreen"
							size={18}
						/>
					)}
				</S.Direction>

				<span title={dayjs(historyEntry.date).format("MMMM DD, YYYY (HH:mm)")}>
					{timeSince(historyEntry.date)}
				</span>
			</S.HistorySessionBlock>

			<S.HistorySessionBlock>
				<div key={uuidv4()}>
					{historyEntry.content.map((passfail, index) => (
						<PassfailIcon key={`passfailicon-${index}`} {...{ passfail, index }} />
					))}
				</div>
			</S.HistorySessionBlock>
		</S.HistorySession>
	);
}
