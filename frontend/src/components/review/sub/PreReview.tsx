import { ReviewParamsInput } from "../../../gql/codegen-output";
import useRouteProps from "../../../hooks/useRouteProps";
import usePreReview from "../hooks/usePreReview";
import * as S from "./PreReview.style";

function getBaseType(params: ReviewParamsInput) {
	if ("list_ids" in params) {
		return "List";
	}

	if ("set_ids" in params) {
		return "Set";
	}

	if ("term_ids" in params) {
		return "Terms";
	}
}

function InitialListSetOrTerms({ initialSettings }: PreReviewProps) {
	const reviewBaseType = getBaseType(initialSettings);
	const { params } = useRouteProps();

	return (
		<>
			<div>
				{/* Just listing the id here, but ideally we want a little pop-up card, instead. */}
				{reviewBaseType} review {params.id}
			</div>
		</>
	);
}

type PreReviewProps = {
	initialSettings?: ReviewParamsInput;
};

export default function PreReview({ initialSettings }: PreReviewProps) {
	const { nButtons, directionButtons, handleReviewStartClick } = usePreReview();

	return (
		<S.PreReview>
			<div className="PageHeader">Review settings</div>

			<form>
				<S.SettingsList>
					<li>
						{/* TODO: conditionally render either
                     1. a list/term/set selector if no initial settings specified
                     2. a description of the selected initial settings  */}
						<S.SettingsLabel>Select a list, set, or terms here.</S.SettingsLabel>
						<InitialListSetOrTerms initialSettings={initialSettings} />
					</li>

					<li>
						<S.SettingsLabel htmlFor="n">Number of cycles:</S.SettingsLabel>
						<S.SettingsTip>
							This is the number of times you need to get each term right to
							complete the session.
						</S.SettingsTip>
						<S.Buttons>{nButtons}</S.Buttons>
					</li>

					<li>
						<S.SettingsLabel htmlFor="direction">Direction:</S.SettingsLabel>
						<S.SettingsTip>
							'Forwards' means you're shown the definition in the original
							language, and need to recall the translation. 'Backwards' is the
							other way around: you have to recall the definition in the original
							language.
						</S.SettingsTip>
						<S.Buttons>{directionButtons}</S.Buttons>
					</li>
				</S.SettingsList>

				<S.StartReviewButton
					onClick={handleReviewStartClick}
					type="button"
					value="Start the review with these settings"
				/>
			</form>
		</S.PreReview>
	);
}
