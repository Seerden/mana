/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NewListFromClientInput } from "gql/codegen-output";
import { useMutateCreateList } from "gql/hooks/list.mutation";
import { filterFalsy } from "helpers/filterFalsyValues";
import { useRouteProps } from "hooks/routerHooks";
import { useState, useEffect, useCallback } from "react";
import { FormOutput, FocusIndex } from "types/newList.types";
import NewListTerm from "./NewListTerm";

export function useNewList() {
	const { params, navigate } = useRouteProps();
	const [numTerms, setNumTerms] = useState<number>(10);
	const [formOutput, setFormOutput] = useState<FormOutput>(() => ({
		owner: params.username,
		terms: new Array(numTerms),
	}));
	const [termInputs, setTermInputs] = useState<JSX.Element[]>([] as JSX.Element[]);
	const { mutate: mutateCreateList, isSuccess } = useMutateCreateList();
	const [focussedInput, setFocussedInput] = useState<FocusIndex>();

	useEffect(() => {
		setTermInputs(makeTermInputElements(formOutput, numTerms));
	}, [formOutput, numTerms, focussedInput, setFocussedInput]);

	useEffect(() => {
		if (isSuccess) navigate(`/u/${params.username}/lists`);
	}, [isSuccess]);

	/** Add a keypress listener for tab-key presses.
	 * Add 10 new rows if user presses tab on last input.
	 * Autofocus the first newly added term. */
	const tabListener = (e: KeyboardEvent) => {
		if (
			!e.shiftKey &&
			e.key === "Tab" &&
			focussedInput?.index === termInputs.length - 1 &&
			focussedInput?.side === "to"
		) {
			e.preventDefault();
			setNumTerms((cur) => cur + 10);
			setFocussedInput((cur) => ({ index: cur?.index, side: "from" }));
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", tabListener);
		return () => {
			window.removeEventListener("keydown", tabListener);
		};
	}, [numTerms, focussedInput]);

	const makeTermInputElements = useCallback(
		(formOutput: FormOutput, numTerms: number) => {
			const termElements: JSX.Element[] = [];

			for (let i = 0; i < numTerms; i++) {
				termElements.push(
					<NewListTerm
						key={`term-${i + 1}`}
						index={i}
						autoFocus={i === focussedInput?.index + 1}
						focussedInput={focussedInput}
						setFocussedInput={setFocussedInput}
						formOutput={formOutput} // @todo: formOutput should be recoil atom. Passing the state through props like this for any number of terms might lead to stale closures
						setFormOutput={setFormOutput}
					/>
				);
			}

			return termElements;
		},
		[formOutput, focussedInput, setFocussedInput]
	);

	function handleAddRows(e: React.MouseEvent<HTMLInputElement, MouseEvent>, count = 10) {
		setNumTerms((current) => current + count);
	}

	/**
	 * Form input blur handler that updates a given formOutput field differently depending
	 * on whether the element that blurred belongs to a field that takes an array or not.
	 */
	const handleBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			const { name, value } = e.currentTarget;
			if (value === formOutput[name]) return;

			/*  @fixme: seems like if we blur the same field twice, it will get pushed to the array twice.
             that's not the intended behavior. */
			if (Array.isArray(formOutput[name])) {
				setFormOutput((current) => ({
					...current,
					[name]: [...current[name], value],
				}));
			} else {
				setFormOutput((current) => ({
					...current,
					[name]: value,
				}));
			}
		},
		[formOutput]
	);

	/**
	 * Submit handler that submits the newly created list if and only if all fields are filled
	 * out as required.
	 */
	const handleSubmit = useCallback(
		(e: React.MouseEvent<HTMLInputElement>) => {
			e.preventDefault();
			const fields = ["name", "from", "to", "owner"];
			if (
				fields.every(
					(entry) =>
						entry in formOutput &&
						(typeof formOutput[entry] == "string" || Array.isArray(formOutput[entry]))
				)
			) {
				const nonNullTerms = filterFalsy(formOutput.terms || []);
				if (nonNullTerms?.length) {
					mutateCreateList({
						...formOutput,
						nonNullTerms,
					} as NewListFromClientInput);
				}
			}
		},
		[formOutput, setFormOutput]
	);

	return {
		handleBlur,
		handleAddRows,
		handleSubmit,
		termInputs,
		formOutput,
	} as const;
}
