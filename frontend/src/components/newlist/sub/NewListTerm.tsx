import { newListState } from "components/newlist/state/newList.atom";
import type { FocusIndex } from "components/newlist/types/newList.types";
import React from "react";
import { useSetRecoilState } from "recoil";
import * as S from "./NewListTerm.style";

type NewListTermProps = {
	index: number;
	focussedInput?: FocusIndex;
	setFocussedInput: React.Dispatch<React.SetStateAction<FocusIndex | undefined>>;
	autoFocus: boolean;
};

function NewListTerm({ index, setFocussedInput, autoFocus }: NewListTermProps) {
	const setNewList = useSetRecoilState(newListState);

	function handleTermBlur(e: React.FocusEvent<HTMLInputElement>, idx: number) {
		setFocussedInput((cur) => ({ ...cur, index: -1 }));
		const { name, value } = e.target; // name is "from_value" | "to_value"

		if (!value) return;

		setNewList((cur) => {
			const termsCopy = cur.terms.slice();

			if (!termsCopy[idx]) {
				termsCopy[idx] = {
					to_value: "",
					from_value: "",
					from_language: "",
					to_language: "",
				};
			}

			if (value !== termsCopy[idx][name]) {
				termsCopy[idx] = { ...termsCopy[idx], [name]: value };
				return { ...cur, terms: termsCopy };
			}

			return cur;
		});
	}

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		e.persist();
		setFocussedInput({ side: e.currentTarget.name, index } as FocusIndex);
	};

	const inputProps: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {
		onFocus: (e) => handleFocus(e),
		onBlur: (e) => handleTermBlur(e, index),
		type: "text",
	};

	return (
		<S.Term>
			<S.TermIndex>{index + 1}</S.TermIndex>

			<S.TermInputs>
				<S.TermInput {...inputProps} autoFocus={autoFocus} name="from_value" />
				<S.TermInput {...inputProps} name="to_value" />
			</S.TermInputs>
		</S.Term>
	);
}

export default NewListTerm;
