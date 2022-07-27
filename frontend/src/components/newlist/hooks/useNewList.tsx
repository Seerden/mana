import type { FocusIndex } from "components/newlist/types/newList.types";
import useRouteProps from "hooks/useRouteProps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NewListWithTermsInput } from "../../../gql/codegen-output";
import { useMutateCreateList } from "../../../gql/hooks/list/useCreateList";
import { filterFalsy } from "../helpers/filterFalsyValues";
import NewListTerm from "../sub/NewListTerm";

/*
   TODO: numTerms is a piece of intermediate state, the changing of which
   triggers some updates in other pieces of state. This is not declarative at
   all and I dislike it strongly. Refactor the control flow of this component to
   be more declarative.

   Something similar can be said about the flow of:
   - initializing newList from recoil state,
   - setting newList.owner and newList.terms in an effect
   - updating termInputs based on changes made to newList
   It's like a cascading waterfall of state sewage.
*/

const defaultNewList: NewListWithTermsInput = {
	from_language: "",
	to_language: "",
	name: "",
	terms: [],
};

/** Hook that handles functionality for the NewList form component. */
export function useNewList() {
	const { params, navigate } = useRouteProps();

	const { mutate: mutateCreateList } = useMutateCreateList({
		onSuccess: () => navigate(`/u/${params.username}/lists`),
	});

	const [numTerms, setNumTerms] = useState<number>(10);

	/** Add a number (`count`) of rows (= empty terms) to the newList form. */
	function addRows(count = 10) {
		setNumTerms((current) => current + count);
	}

	const [focussedInput, setFocussedInput] = useState<FocusIndex>();

	const [newList, setNewList] = useState<NewListWithTermsInput>(defaultNewList);

	const termInputs: JSX.Element[] = useMemo(() => {
		return Array(numTerms)
			.fill(null)
			.map((_, i) => (
				<NewListTerm
					setNewList={setNewList}
					key={`term-${i + 1}`}
					index={i}
					autoFocus={i === focussedInput?.index + 1}
					setFocussedInput={setFocussedInput}
				/>
			));
	}, [newList, numTerms, focussedInput, setFocussedInput]);

	useEffect(() => {
		/*  newList is initialized completely empty.
            on mount, we can populate .owner and .terms  */
		setNewList((cur) => ({
			...cur,
			terms: new Array(numTerms),
		}));
	}, [numTerms]);

	/** Keydown listener for tab-key presses:
	 * Add 10 new rows if user presses the tab key while they're
	 * on the last term input. Autofocus the first newly added term. */
	const tabListener = useCallback(
		(e: KeyboardEvent) => {
			if (
				!e.shiftKey &&
				e.key === "Tab" &&
				focussedInput?.index === termInputs.length - 1 &&
				focussedInput?.side === "to"
			) {
				e.preventDefault();
				addRows();
				setFocussedInput((cur) => ({ index: cur?.index, side: "from" }));
			}
		},
		[focussedInput, termInputs]
	);

	useEffect(() => {
		window.addEventListener("keydown", tabListener);

		return () => {
			window.removeEventListener("keydown", tabListener);
		};
	}, [tabListener]);

	/**
	 * Form input blur handler that updates a given newList field differently depending
	 * on whether the element that blurred belongs to a field that takes an array or not.
	 */
	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			const { name, value } = e.currentTarget;
			if (value === newList[name]) return;

			/*  @fixme: seems like if we blur the same field twice, it will get pushed to the array twice.
             that's not the intended behavior. */
			if (Array.isArray(newList[name])) {
				setNewList((current) => ({
					...current,
					[name]: [...current[name], value],
				}));
			} else {
				setNewList((current) => ({
					...current,
					[name]: value,
				}));
			}
		},
		[newList]
	);

	/**
	 * Submit handler that submits the newly created list if and only if all fields are filled
	 * out as required and there is at least one term in the list.
	 */
	const handleSubmit = useCallback(
		(e: React.MouseEvent<HTMLInputElement>) => {
			e.preventDefault();

			const fields = ["name", "from_language", "to_language"];

			if (
				fields.every(
					(entry) =>
						entry in newList &&
						(typeof newList[entry] == "string" || Array.isArray(newList[entry]))
				)
			) {
				const nonNullTerms = filterFalsy(newList.terms || []);

				if (nonNullTerms.length > 0) {
					const list: NewListWithTermsInput = {
						...newList,
						terms: nonNullTerms.map((t) => ({
							...t,
							from_language: newList.from_language,
							to_language: newList.to_language,
						})),
					};

					mutateCreateList(list);
				}
			}
		},
		[newList, setNewList]
	);

	return {
		handleBlur,
		addRows,
		handleSubmit,
		termInputs,
		newList,
	} as const;
}
