import dayjs from "dayjs";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { Term } from "../../../gql/codegen-output";
import { colors } from "../../../helpers/theme/colors";
import { timeSince } from "../../../helpers/time";
import PassfailIcon from "../../_shared/PassfailIcon";
import * as S from "./TermReviewHistory.style";

export default function TermReviewHistory({ history }: { history: Term["history"] }) {
	const [showAll, setShowAll] = useState(false);
	const toggleShowAll = () => setShowAll((cur) => !cur);

	const historyElements = [...history]
		.reverse()
		.map((session) => (
			<HistoryElement entries={session} key={session[0].review_entry_id} />
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
	entries: Term["history"][number];
};

function HistoryElement({ entries }: HistoryElementProps) {
	const firstEntry = entries[0];

	return (
		<S.HistorySession>
			<S.HistorySessionBlock>
				<S.Direction>
					{firstEntry.direction === "forwards" ? (
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

				<span title={dayjs(firstEntry.created_at).format("MMMM DD, YYYY (HH:mm)")}>
					{timeSince(firstEntry.created_at * 1000)}
				</span>
			</S.HistorySessionBlock>

			<S.HistorySessionBlock>
				{entries.map((entry) => (
					<PassfailIcon
						key={`passfailicon-${entry.review_entry_id}`}
						passfail={entry.passfail}
						index={entry.review_entry_id}
					/>
				))}
			</S.HistorySessionBlock>
		</S.HistorySession>
	);
}
