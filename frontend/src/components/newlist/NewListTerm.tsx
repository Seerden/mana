import React, { memo, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { newListState } from "state/atoms/newList.atom";
import type { FocusIndex } from "types/newList.types";
import * as S from "./NewListTerm.style";

type NewListTermProps = {
	index: number;
	focussedInput?: FocusIndex;
	setFocussedInput: React.Dispatch<React.SetStateAction<FocusIndex | undefined>>;
	autoFocus: boolean;
};

const NewListTerm = memo(
	({ index, setFocussedInput, focussedInput, autoFocus }: NewListTermProps) => {
		const setNewList = useSetRecoilState(newListState);
		const isFocussed = useMemo(() => focussedInput?.index === index, [focussedInput]);

		function handleTermBlur(e: React.FocusEvent<HTMLInputElement>, idx: number) {
			setFocussedInput((cur) => ({ ...cur, index: -1 }));
			const { name, value } = e.target; // name is "from" | "to"

			if (!value) return;

			setNewList((cur) => {
				const termsCopy = cur.terms.slice();

				if (!termsCopy[idx]) {
					termsCopy[idx] = { to: "", from: "" };
					console.log("1");
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
				<S.TermIndex isFocussed={isFocussed}>{index + 1}</S.TermIndex>

				<S.TermInputs>
					<S.TermInput {...inputProps} autoFocus={autoFocus} name="from" />
					<S.TermInput {...inputProps} name="to" />
				</S.TermInputs>
			</S.Term>
		);
	}
);

export default NewListTerm;
