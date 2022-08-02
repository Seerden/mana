import usePreReview from "../hooks/usePreReview";
import * as S from "./PreReview.style";

export default function PreReview() {
	const { nButtons, directionButtons, handleReviewStartClick } = usePreReview();

	return (
		<S.PreReview>
			<div className="PageHeader">Review settings</div>

			<form>
				<S.SettingsList>
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
