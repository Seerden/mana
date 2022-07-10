import {
	reviewSettingsState,
	reviewStageState,
} from "components/review/state/reviewAtoms";
import { memo, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import * as S from "./PreReview.style";

type SettingsButtonProps = {
	handleSettingsChange: (e: React.MouseEvent<HTMLInputElement>) => void;
	direction?: Direction;
	n?: number | string;
	value: Direction | number;
	current?: Direction;
};

const PreReview = () => {
	const [reviewSettings, setReviewSettings] = useRecoilState(reviewSettingsState);
	const setReviewStage = useSetRecoilState(reviewStageState);

	const buttons = useMemo(() => {
		return [1, 2, 3, 4, 5].map((num: number) => (
			<SettingsButton
				key={uuidv4()}
				value={num}
				n={reviewSettings.n}
				handleSettingsChange={handleSettingsChange}
			/>
		));
	}, [reviewSettings.n]);

	const directionButtons = useMemo(() => {
		return (["forwards", "backwards"] as Direction[]).map((d) => (
			<SettingsButton
				key={uuidv4()}
				value={d}
				current={reviewSettings.direction}
				direction={d}
				handleSettingsChange={handleSettingsChange}
			/>
		));
	}, [reviewSettings.direction]);

	function handleSettingsChange(e: React.MouseEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;

		const newVal = isNaN(Number(value)) ? value : Number(value);

		setReviewSettings((current) => ({ ...current, [name]: newVal }));
	}

	function handleReviewStartClick() {
		setReviewSettings((current) => ({
			...current,
			sessionStart: new Date(),
			started: true,
		}));
		setReviewStage("started");
	}

	return (
		<S.PreReview>
			<div className="PageHeader">Review settings</div>

			<form>
				<S.SettingsList>
					<li key="review-cycles">
						<S.SettingsLabel htmlFor="n">Number of cycles:</S.SettingsLabel>
						<S.SettingsTip>
							This is the number of times you need to get each term right to
							complete the session.
						</S.SettingsTip>
						<S.Buttons>{buttons}</S.Buttons>
					</li>

					<li key="review-direction">
						<S.SettingsLabel htmlFor="direction">Direction:</S.SettingsLabel>
						<S.SettingsTip>
							'Forwards' means you're shown the front, and need to recall the back
							of the card. 'Backwards' is the other way around.
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
};

export default PreReview;

const SettingsButton = memo(
	({ handleSettingsChange, direction, n, value, current }: SettingsButtonProps) => {
		const selected = n ? String(n) === String(value) : direction === current;

		return (
			<S.SettingsButton
				selected={selected}
				onClick={handleSettingsChange}
				name={n ? "n" : "direction"}
				type="button"
				value={value}
			/>
		);
	}
);
