import dayjs from "dayjs";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { ReviewSessionEntry } from "../../../gql/codegen-output";
import { colors } from "../../../helpers/theme/colors";
import { timeSince } from "../../../helpers/time";
import PassfailIcon from "../../_shared/PassfailIcon";
import * as S from "./TermReviewHistory.style";

export default function TermReviewHistory({
	history,
}: {
	history: ReviewSessionEntry[];
}) {
	const [showAll, setShowAll] = useState(false);

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
						<S.ExpandButton onClick={() => setShowAll(!showAll)}>
							{!showAll ? "Showing one" : "Showing all"}
						</S.ExpandButton>
					)}
				</S.Header>
				{historyElements.length > 0 && (
					<S.HistoryContent>
						{showAll ? historyElements : historyElements[0]}
					</S.HistoryContent>
				)}
			</S.History>
		</>
	);
}

type HistoryElementProps = {
	historyEntry: ReviewSessionEntry;
};

function HistoryElement({ historyEntry }: HistoryElementProps) {
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

				<span title={dayjs(historyEntry.created_at).format("MMMM DD, YYYY (HH:mm)")}>
					{timeSince(historyEntry.created_at)}
				</span>
			</S.HistorySessionBlock>

			<S.HistorySessionBlock>
				<div key={uuidv4()}>
					<PassfailIcon
						key={`passfailicon-${historyEntry.review_entry_id}`}
						passfail={historyEntry.passfail}
						// TODO: temporarily force index=0 during refactor effort
						index={0}
					/>
				</div>
			</S.HistorySessionBlock>
		</S.HistorySession>
	);
}
