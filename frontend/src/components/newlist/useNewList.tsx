/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NewListFromClientInput } from "gql/codegen-output";
import { useMutateCreateList } from "gql/hooks/list.mutation";
import { filterFalsy } from "helpers/filterFalsyValues";
import { useRouteProps } from "hooks/routerHooks";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { newListState } from "state/atoms/newList.atom";
import type { FocusIndex } from "types/newList.types";
import NewListTerm from "./NewListTerm";

/**
 * Hook that handles functionality for the NewList form component
 */
export function useNewList() {
	const { params, navigate } = useRouteProps();
	const [numTerms, setNumTerms] = useState<number>(10);
	const { mutate: mutateCreateList, isSuccess } = useMutateCreateList();
	const [focussedInput, setFocussedInput] = useState<FocusIndex>();
	const [newList, setNewList] = useRecoilState(newListState);
	const termInputs: JSX.Element[] = useMemo(() => {
		const inputs = [];
		for (let i = 0; i < numTerms; i++) {
			inputs.push(
				<NewListTerm
					key={`term-${i + 1}`}
					index={i}
					autoFocus={i === focussedInput?.index + 1}
					focussedInput={focussedInput}
					setFocussedInput={setFocussedInput}
				/>
			);
		}
		return inputs;
	}, [newList, numTerms, focussedInput, setFocussedInput]);

	useEffect(() => {
		/*  newList is initialized completely empty.
            on mount, we can populate .owner and .terms  */
		setNewList((cur) => ({ ...cur, owner: params.username, terms: new Array(numTerms) }));
	}, [params, numTerms]);

	useEffect(() => {
		if (isSuccess) {
			navigate(`/u/${params.username}/lists`);
		}
	}, [isSuccess]);

	useEffect(() => {
		/** Keydown listener for tab-key presses:
		 * Add 10 new rows if user presses the tab key while they're
		 * on the last term input. Autofocus the first newly added term. */
		function tabListener(e: KeyboardEvent) {
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
		}

		window.addEventListener("keydown", tabListener);

		return () => {
			window.removeEventListener("keydown", tabListener);
		};
	}, [focussedInput, termInputs]);

	/**
	 * Add a number (`count`) of rows (= empty terms) to the newList form.
	 */
	function addRows(count = 10) {
		setNumTerms((current) => current + count);
	}

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
			const fields = ["name", "from", "to", "owner"];
			if (
				fields.every(
					(entry) =>
						entry in newList &&
						(typeof newList[entry] == "string" || Array.isArray(newList[entry]))
				)
			) {
				const nonNullTerms = filterFalsy(newList.terms || []);
				if (nonNullTerms.length > 0) {
					mutateCreateList({
						...newList,
						terms: nonNullTerms,
					} as NewListFromClientInput);
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
