import { listState, selectingTermsToReviewState } from "components/list/state/listAtoms";
import { termsToReviewState } from "components/review/state/review-atoms";
import { useMutateEditTerm } from "gql/hooks/term-query";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Term } from "../../../gql/codegen-output";

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
	const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
	const { mutate: mutateEditTerm } = useMutateEditTerm();
	let indexOfTermInTermsToReview = termsToReview.findIndex((t) => t._id === term._id);
	// TODO: can combine selected and indexOf..., AND the following useEffect,
	// into one useMemo() callback computation, I think.
	const [selected, setSelected] = useState(indexOfTermInTermsToReview > -1);

	useEffect(() => {
		// might be superfluous
		indexOfTermInTermsToReview = termsToReview.findIndex((t) => t._id === term._id);
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
	function handleTermEdit(
		e: React.FocusEvent<HTMLInputElement & { side: "from" | "to" }>
	) {
		const { value } = e.target;
		const { side } = e.currentTarget.dataset;

		if (value && term[side] !== value) {
			const newTerm = { ...term, [side]: value };
			setTerm(newTerm);

			const mutationVariables = {
				_id: term._id,
				[side]: value,
			};

			mutateEditTerm(mutationVariables);

			// Optimistically assume successful mutation, and edit the term in the list in-place.
			const newListContent = [...listAtom.terms];
			newListContent[idx] = { ...newListContent[idx], [side]: value };
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
