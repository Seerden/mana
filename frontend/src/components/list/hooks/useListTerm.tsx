import { listState, selectingTermsToReviewState } from "components/list/state/listAtoms";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
	const selectingTerms = useRecoilValue(selectingTermsToReviewState);

	// TODO: temporarily set this to [] instead of termsToReviewState
	const [termsToReview, setTermsToReview] = useState([]);
	const { mutate: mutateUpdateTerms } = useUpdateTermValues();
	let indexOfTermInTermsToReview = termsToReview.findIndex(
		(t) => t.term_id === term.term_id
	);
	// TODO: can combine selected and indexOf..., AND the following useEffect,
	// into one useMemo() callback computation, I think.
	const [selected, setSelected] = useState(indexOfTermInTermsToReview > -1);

	useEffect(() => {
		// might be superfluous
		indexOfTermInTermsToReview = termsToReview.findIndex(
			(t) => t.term_id === term.term_id
		);
		setSelected(indexOfTermInTermsToReview > -1);
	}, [termsToReview]);

	useEffect(() => {
		return () => {
			setConfirmingDelete(false);
		};
	}, []);

	/**
	 * If term is in termsToReview, remove it. If it's not in yet, append it.
	 * Also update `selected` state.
	 */
	function handleSelect(e: MouseEvent<HTMLDivElement>) {
		e.stopPropagation();

		if (indexOfTermInTermsToReview > -1) {
			setTermsToReview((current) => {
				const newVal = [...current];
				newVal.splice(indexOfTermInTermsToReview, 1);
				return newVal;
			});
			setSelected(false);
		} else {
			setTermsToReview((current) => [...current, term]);
			setSelected(true);
		}
	}

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
		selectingTerms,
		selected,
		handleSelect,
		handleConfirmClick,
		handleTermEdit,
		confirmingDelete,
		setConfirmingDelete,
	} as const;
}
