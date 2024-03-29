import { convertDateListToDeltaTime } from "components/review/helpers/review-helpers";
import { Link } from "react-router-dom";
import { usePostReview } from "../hooks/usePostReview";

export default function PostReview() {
	const {
		navigate,
		params,
		formatDate,
		sessionStart,
		sessionEnd,
		timePerCard,
		reviewSettings,
	} = usePostReview();

	return (
		<div>
			<h2>Session completed.</h2>
			<div>Started at {formatDate(sessionStart)}</div>
			<div>Completed at {formatDate(sessionEnd)}</div>
			<div>
				Time per card:{" "}
				{JSON.stringify(
					convertDateListToDeltaTime(timePerCard, reviewSettings.sessionStart)
				)}
			</div>

			<button>
				<Link to={`/u/${params.username}/list/${params.id}`}>Back to list</Link>
			</button>

			<button>
				<Link to={`/u/${params.username}/lists`}>Back to lists overview</Link>
			</button>

			<button onClick={() => navigate(0)}>
				<Link to={`/u/${params.username}/list/${params.id}/review`}>
					Review this list again
				</Link>
			</button>
		</div>
	);
}
