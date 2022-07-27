import dayjs from "dayjs";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
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
	const toggleShowAll = () => setShowAll((cur) => !cur);

	const historyElements = [...history]
		.reverse()
		.map((element) => (
			<HistoryElement historyEntry={element} key={element.review_entry_id} />
		));

	return (
		<>
			<S.History>
				<S.Header>
					<S.Description>
						You've reviewed this term {historyElements.length} time
						{historyElements.length === 1 ? "" : "s"}
					</S.Description>

					{historyElements.length > 1 && (
						<S.ExpandButton onClick={toggleShowAll}>
							{showAll ? "Showing all sessions" : "Showing latest session"}
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
							fill="limegreen" // TODO: add to green theme value
							size={18}
						/>
					)}
				</S.Direction>

				<span title={dayjs(historyEntry.created_at).format("MMMM DD, YYYY (HH:mm)")}>
					{timeSince(historyEntry.created_at)}
				</span>
			</S.HistorySessionBlock>

			<S.HistorySessionBlock>
				<PassfailIcon
					key={`passfailicon-${historyEntry.review_entry_id}`}
					passfail={historyEntry.passfail}
					index={0} // NOTE: temporarily forcing index=0 during refactor effort
				/>
			</S.HistorySessionBlock>
		</S.HistorySession>
	);
}
