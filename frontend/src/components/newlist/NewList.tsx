import { memo } from "react";
import "./NewList.scss";
import { BiArrowToRight } from "react-icons/bi";
import { useNewList } from "./useNewList";

const NewList = memo(() => {
	const { handleBlur, handleAddRows, handleSubmit, termInputs, formOutput } =
		useNewList();

	return (
		<div className="NewList">
			<div className="PageHeader">New List</div>

			<form className="NewList__form">
				<section className="NewList__form--header">
					<div className="NewList__form--name"></div>
					<label className="NewList__form--name-label">List name</label>
					<input
						className="NewList__form--name-input"
						onBlur={handleBlur}
						type="text"
						name="name"
						placeholder="week 3 vocabulary"
					/>

					<div className="NewList__form--languages">
						<div className="NewList__form--languages-language">
							<label htmlFor="from" className="NewList__form--languages-language-label">
								Original language
							</label>
							<input
								className="NewList__form--languages-language-input"
								onBlur={handleBlur}
								type="text"
								name="from"
								placeholder="Klingon"
							/>
						</div>
						<BiArrowToRight className="NewList__form--languages-icon" />

						<div className="NewList__form--languages-language">
							<label htmlFor="to" className="NewList__form--languages-language-label">
								Target language
							</label>
							<input
								className="NewList__form--languages-language-input"
								onBlur={handleBlur}
								type="text"
								name="to"
								placeholder="Elvish"
							/>
						</div>
					</div>
				</section>

				<section className="NewList__form--buttons">
					<input
						className="NewList__form--button"
						onClick={handleAddRows}
						type="button"
						value="Add rows"
					/>
					<input
						className="NewList__form--button"
						onClick={handleSubmit}
						type="button"
						value="Create list"
					/>
				</section>

				<section className="NewList__terms">
					{termInputs.length > 0 && (
						<>
							<div className="NewList__terms--header">
								{formOutput && (
									<>
										<span className="NewList__terms--header-side">{formOutput.from}</span>
										<span className="NewList__terms--header-side">{formOutput.to}</span>
									</>
								)}
							</div>
							{termInputs}
						</>
					)}
				</section>
			</form>
		</div>
	);
});

export default NewList;
