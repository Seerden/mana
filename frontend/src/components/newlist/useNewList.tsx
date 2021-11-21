/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutateCreateList } from "gql/hooks/list.mutation";
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
		isSuccess && navigate(`/u/${params.username}/lists`);
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

	function handleAddRows() {
		setNumTerms((current) => current + 10);
	}

	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		const { name, value } = e.currentTarget;
		if (value !== formOutput[name]) {
			if (Array.isArray(formOutput[name])) {
				setFormOutput({
					...formOutput,
					[e.currentTarget.name]: [
						...formOutput[e.currentTarget.name],
						e.currentTarget.value,
					],
				});
			} else {
				setFormOutput({
					...formOutput,
					[e.currentTarget.name]: e.currentTarget.value,
				});
			}
		}
	}

	const handleSubmit = useCallback(
		(e: React.MouseEvent<HTMLInputElement>) => {
			e.preventDefault();

			if (
				["name", "from", "to", "owner"].every((entry) => {
					return (
						// eslint-disable-next-line no-prototype-builtins
						formOutput.hasOwnProperty(entry) &&
						(typeof formOutput[entry] == "string" || Array.isArray(formOutput[entry]))
					);
				})
			) {
				const terms = formOutput.terms?.filter((term) => term !== null);

				if (terms && terms.length > 0) {
					// @ts-ignore - because of how we check for the existence of keys above, TS doesn't know they exist
					mutateCreateList({
						...formOutput,
						terms,
					});
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
