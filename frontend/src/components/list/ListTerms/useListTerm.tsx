import { Term } from "gql/codegen-output";
import { useMutateEditTerm } from "gql/hooks/term.query";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { listState, selectingTermsToReviewState } from "state/atoms/listAtoms";
import { termsToReviewState } from "state/atoms/reviewAtoms";

export function useListTerm({ term, handleTermDelete, idx, setTerm }) {
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const [open, setOpen] = useState<boolean>(false);
	const [listAtom, setListAtom] = useRecoilState(listState);
	const selectingTerms = useRecoilValue(selectingTermsToReviewState);
	const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
	const { mutate: mutateEditTerm } = useMutateEditTerm();
	let indexOfTermInTermsToReview = termsToReview.findIndex((t) => t._id === term._id);
	const [selected, setSelected] = useState(indexOfTermInTermsToReview > -1);

	useEffect(() => {
		// might be superfluous
		indexOfTermInTermsToReview = termsToReview.findIndex((t) => t._id === term._id);
		setSelected(indexOfTermInTermsToReview > -1);
	}, [termsToReview]);

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

	function handleSelect(e) {
		e.stopPropagation();

		if (indexOfTermInTermsToReview > -1) {
			const currentTermsToReview = [...termsToReview];
			currentTermsToReview.splice(indexOfTermInTermsToReview, 1);
			setTermsToReview(currentTermsToReview);
			setSelected(false);
		} else {
			setTermsToReview((current) => [...current, term]);
			setSelected(true);
		}
	}

	/**
	 * Remove the term from the list. Triggered on deletion confirmation.
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
	 * Fire a mutation to edit the term's 'from'/'to' value in the database, and update this value in listAtom
	 */
	function handleTermEdit(
		e: React.FocusEvent<HTMLInputElement & { side: "from" | "to" }>
	) {
		const side = e.currentTarget.getAttribute("side");
		if (e.target.value && term[side] !== e.target.value) {
			const newTerm = { ...term, [side]: e.target.value };
			setTerm(newTerm);

			const mutationVariables = {
				_id: term._id,
				[side]: e.target.value,
			};

			mutateEditTerm(mutationVariables);

			// assume the mutation will be successful, and just edit the term in the list in-place
			const newListContent: Term[] = [...listAtom.terms];
			newListContent[idx] = { ...newListContent[idx], [side]: e.target.value };
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
        setConfirmingDelete
    } as const;
}
