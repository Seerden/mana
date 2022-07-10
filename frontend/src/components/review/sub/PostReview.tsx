import { convertDateListToDeltaTime } from "components/review/helpers/review-helpers";
import { Link } from "react-router-dom";
import { usePostReview } from "../hooks/usePostReview";

const PostReview = () => {
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
		<div className="Review__post">
			<h2>Session completed.</h2>
			<div>Started at {formatDate(sessionStart)}</div>
			<div>Completed at {formatDate(sessionEnd)}</div>
			<div>
				Time per card:{" "}
				{JSON.stringify(
					convertDateListToDeltaTime(timePerCard, reviewSettings.sessionStart)
				)}
			</div>

			<button className="Button">
				<Link to={`/u/${params.username}/list/${params.id}`}>Back to list</Link>
			</button>

			<button className="Button">
				<Link to={`/u/${params.username}/lists`}>Back to lists overview</Link>
			</button>

			<button onClick={() => navigate(0)} className="Button">
				<Link to={`/u/${params.username}/list/${params.id}/review`}>
					Review this list again
				</Link>
			</button>
		</div>
	);
};

export default PostReview;
