import { listState } from "components/list/state/listAtoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Term } from "../../../gql/codegen-output";
import useUpdateTermValues from "../../../gql/hooks/term/useUpdateTerm";

type Props = {
	term: Term;
	idx: number;
	setTerm: React.Dispatch<React.SetStateAction<Term>>;
	handleTermDelete(idx: number): void;
};

export function useListTerm({ term, handleTermDelete, idx, setTerm }: Props) {
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const [open, setOpen] = useState<boolean>(false);
	const [listAtom, setListAtom] = useRecoilState(listState);
	const { mutate: mutateUpdateTerms } = useUpdateTermValues();

	useEffect(() => {
		return () => {
			setConfirmingDelete(false);
		};
	}, []);

	/**
	 * Remove the term from the list. Intended usage is to trigger this on
	 * deletion confirmation.
	 */
	function handleConfirmClick(e: React.SyntheticEvent, action: { type: "delete" }) {
		e.preventDefault();
		setConfirmingDelete(false);
		setOpen(false);
		if (action.type === "delete") {
			handleTermDelete(idx);
		}
	}

	/**
	 * Fire a mutation to edit the term's 'from'/'to' value in the database, and
	 * update this value in listAtom.
	 */
	function handleTermEdit(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target;
		const { field } = e.currentTarget.dataset;

		if (value && term[field] !== value) {
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
	}
	return {
		open,
		setOpen,
		handleConfirmClick,
		handleTermEdit,
		confirmingDelete,
		setConfirmingDelete,
	} as const;
}
