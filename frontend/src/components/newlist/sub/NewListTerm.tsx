import React, { forwardRef, Ref } from "react";
import { NewListWithTermsInput } from "../../../gql/codegen-output";
import * as S from "./NewListTerm.style";

type NewListTermProps = {
	index: number;
	isHidden?: boolean;
	setNewList: React.Dispatch<React.SetStateAction<NewListWithTermsInput>>;
};

const NewListTerm = forwardRef(
	({ index, setNewList, isHidden }: NewListTermProps, ref: Ref<HTMLInputElement>) => {
		function handleTermBlur(e: React.FocusEvent<HTMLInputElement>, idx: number) {
			const { name, value } = e.target; // name is "from_value" | "to_value"

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

		const inputProps: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {
			onBlur: (e) => handleTermBlur(e, index),
			type: "text",
		};

		return (
			<S.Term isHidden={isHidden}>
				<S.TermIndex>{index + 1}</S.TermIndex>

				<S.TermInputs>
					<S.TermInput {...inputProps} name="from_value" />
					<S.TermInput {...inputProps} name="to_value" ref={ref ?? null} />
				</S.TermInputs>
			</S.Term>
		);
	}
);

export default NewListTerm;
