import React, { memo } from "react";
import type { FormOutput, FocusIndex } from "types/newList.types";
import "./NewList.scss";

type NewListTermProps = {
	index: number;
	formOutput: FormOutput;
	setFormOutput: React.Dispatch<React.SetStateAction<FormOutput>>;
	focussedInput?: FocusIndex;
	setFocussedInput: React.Dispatch<
		React.SetStateAction<FocusIndex | undefined>
	>;
	autoFocus: boolean;
};

const NewListTerm = memo(
	({
		index,
		formOutput,
		setFormOutput,
		setFocussedInput,
		focussedInput,
		autoFocus,
	}: NewListTermProps) => {
		function handleTermBlur(
			e: React.FocusEvent<HTMLInputElement>,
			idx: number
		) {
			setFocussedInput((cur) => ({ ...cur, index: -1 }));

			let copy = { ...formOutput };
			// @ts-ignore
			if (!copy.terms[idx] && e.target.value) {
				// @ts-ignore
				copy.terms[idx] = { to: "", from: "" };
			}
			// @ts-ignore
			if (e.target.value && e.target.value !== copy.terms[idx][e.target.name]) {
				// @ts-ignore
				copy.terms[idx][e.target.name] = e.target.value;
				setFormOutput({ ...formOutput, terms: copy.terms });
			}
		}
		const isFocussed = focussedInput?.index === index;

		const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			e.persist();
			setFocussedInput({ side: e.currentTarget?.name, index } as FocusIndex);
		};

		return (
			<div className="NewList__term">
				<div
					className="NewList__term--index"
					style={{
						backgroundColor: isFocussed ? "deepskyblue" : "#111",
						color: isFocussed ? "black" : "azure",
					}}
				>
					{index + 1}
				</div>

				<div className="NewList__term--inputs">
					<input
						className="NewList__term--input"
						onFocus={(e) => handleFocus(e)}
						onBlur={(e) => handleTermBlur(e, index)}
						type="text"
						autoFocus={autoFocus}
						name="from"
					/>
					<input
						className="NewList__term--input"
						onFocus={(e) => handleFocus(e)}
						onBlur={(e) => handleTermBlur(e, index)}
						type="text"
						name="to"
					/>
				</div>
			</div>
		);
	}
);

export default NewListTerm;
