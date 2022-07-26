import { listState } from "components/list/state/listAtoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Term } from "../../../gql/codegen-output";
import useUpdateTermValues from "../../../gql/hooks/term/useUpdateTerm";

type Props = {
	term: Term;
	idx: number;
	setTerm: React.Dispatch<React.SetStateAction<Term>>;
};

export function useListTerm({ term, idx, setTerm }: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const [listAtom, setListAtom] = useRecoilState(listState);
	const { mutate: mutateUpdateTerms } = useUpdateTermValues();

	/**
	 * Fire a mutation to edit the term's 'from'/'to' value in the database, and
	 * update this value in listAtom.
	 */
	function handleTermEdit(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target;
		const { field } = e.currentTarget.dataset;

		if (!value || term[field] === value) return;

		const newTerm = { ...term, [field]: value };
		setTerm(newTerm);

		mutateUpdateTerms({
			updateOptions: [
				{
					term_id: term.term_id,
					[field]: value,
				},
			],
		});

		// Optimistically assume successful mutation, and edit the term in the list in-place.
		const newListContent = [...listAtom.terms];
		newListContent[idx] = { ...newListContent[idx], [field]: value };
		const newList = { ...listAtom, terms: [...newListContent] };
		setListAtom(newList);
	}
	return {
		open,
		setOpen,
		handleTermEdit,
	} as const;
}
