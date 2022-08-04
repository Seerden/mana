import { Link } from "react-router-dom";
import { usePostReview } from "../hooks/usePostReview";

export default function PostReview() {
	const { navigate, params, formatDate, start_date, end_date } = usePostReview();

	return (
		<div>
			<h2>Session completed.</h2>
			<div>Started at {formatDate(new Date(start_date))}</div>
			<div>Completed at {formatDate(new Date(end_date))}</div>

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
