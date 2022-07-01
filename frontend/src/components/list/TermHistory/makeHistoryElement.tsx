import PassfailIcon from "components/_shared/PassfailIcon";
import dayjs from "dayjs";
import { timeSince } from "helpers/time";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../../../helpers/theme/colors";

import * as S from "./TermHistory.style";

export function makeHistoryElement(history) {
	return history.map((el) => (
		<li key={uuidv4()}>
			<S.HistorySession>
				<S.HistorySessionBlock>
					<S.Direction>
						{el.direction === "forwards" ? (
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

					<span title={dayjs(el.date).format("MMMM DD, YYYY (HH:mm)")}>
						{timeSince(el.date)}
					</span>
				</S.HistorySessionBlock>

				<S.HistorySessionBlock>
					<div key={uuidv4()}>
						{el.content.map((passfail, index) => (
							<PassfailIcon
								key={`passfailicon-${index}`}
								{...{ passfail, index }}
							/>
						))}
					</div>
				</S.HistorySessionBlock>
			</S.HistorySession>
		</li>
	));
}
