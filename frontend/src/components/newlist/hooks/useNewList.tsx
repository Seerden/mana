import useRouteProps from "hooks/useRouteProps";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NewListWithTermsInput } from "../../../gql/codegen-output";
import { useMutateCreateList } from "../../../gql/hooks/list/useCreateList";
import { filterFalsy } from "../helpers/filterFalsyValues";
import { isValidNewList } from "../helpers/validate-new-list";
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
	terms: new Array(10), // 10 term inputs by default
};

/** Hook that handles functionality for the NewList form component. */
export function useNewList() {
	const { params, navigate } = useRouteProps();

	const { mutate: mutateCreateList } = useMutateCreateList({
		onSuccess: () => navigate(`/u/${params.username}/lists`),
	});

	/** Add some amount of rows (i.e. empty terms) to newList. */
	function addRows(count = 10) {
		setNewList((cur) => ({
			...cur,
			terms: cur.terms.concat(new Array(count)),
		}));
	}

	const [newList, setNewList] = useState<NewListWithTermsInput>(defaultNewList);

	const focusRef = useRef<HTMLInputElement>();

	const termInputs: JSX.Element[] = useMemo(() => {
		const termCount = newList.terms.length;

		return Array(termCount + 5)
			.fill(null)
			.map((_, i) => {
				return (
					<NewListTerm
						setNewList={setNewList}
						isHidden={i >= termCount}
						key={`term-${i + 1}`}
						index={i}
						ref={i === termCount - 1 ? focusRef : null}
					/>
				);
			});
	}, [newList]);

	/** Keydown listener for tab-key presses:
	 * Add 10 new rows if user presses the tab key while they're
	 * on the last term input. Autofocus the first newly added term. */
	function tabListener(e: KeyboardEvent) {
		if (!e.shiftKey && e.key === "Tab" && e.target === focusRef.current) {
			addRows();
		}
	}

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
	 * - validate `newList`
	 * - filter out empty term inputs
	 * - send `mutateCreateList` mutation
	 */
	const handleSubmit = useCallback(
		(e: React.MouseEvent<HTMLInputElement>) => {
			e.preventDefault();

			if (!isValidNewList(newList)) return;

			const terms = filterFalsy(newList.terms);

			const list: NewListWithTermsInput = {
				...newList,
				terms: terms.map((t) => ({
					...t,
					from_language: newList.from_language,
					to_language: newList.to_language,
				})),
			};

			mutateCreateList(list);
		},
		[newList]
	);

	return {
		handleBlur,
		addRows,
		handleSubmit,
		termInputs,
		newList,
	} as const;
}
