import { useEffect } from "react";
import dayjs from "dayjs";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { useRouteProps } from "../../../hooks/routerHooks";
import {
	timePerCardState,
	reviewSettingsState,
	termsToReviewState,
} from "state/atoms/reviewAtoms";
import { convertDateListToDeltaTime } from "helpers/reviewHelpers";

const PostReview = () => {
	const { navigate, params } = useRouteProps();
	const formatDate = (date: Date) => dayjs(date).format("HH:mm:ss");
	const { sessionStart, sessionEnd } = useRecoilValue(reviewSettingsState);
	const resetTermsToReview = useResetRecoilState(termsToReviewState);
	const timePerCard = useRecoilValue(timePerCardState);
	const resetTimePerCard = useResetRecoilState(timePerCardState);
	const reviewSettings = useRecoilValue(reviewSettingsState);

	useEffect(() => {
		return () => {
			resetTermsToReview();
			resetTimePerCard();
		};
	}, []);

	return (
		<div className="Review__post">
			<h2>Session completed.</h2>
			<div>Started at {formatDate(sessionStart!)}</div>
			<div>Completed at {formatDate(sessionEnd!)}</div>
			<div>
				Time per card:{" "}
				{JSON.stringify(
					convertDateListToDeltaTime(timePerCard, reviewSettings.sessionStart!)
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
