import useRouteProps from "hooks/useRouteProps";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { NewListWithTermsInput } from "../../../gql/codegen-output";
import { useMutateCreateList } from "../../../gql/hooks/list/useCreateList";
import { filterFalsy } from "../helpers/filterFalsyValues";
import { isValidNewList } from "../helpers/validate-new-list";
import NewListTerm from "../sub/NewListTerm";

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
	 * on the last term input. Autofocus the first newly added term.
	 *
	 * NOTE: case study: scrolling an element into view
	 * - addRows() adds new (empty) term inputs. The last visible one of these
	 *   becomes focusRef.current(). It's quite likely that these new inputs are
	 *   below the current viewport bottom, and thus we want to scroll the
	 *   element into view. There's a bunch of ways to do this:
	 *    1. requestAnimationFrame(() => {
	 *          scrollIntoView logic here
	 *       })
	 *    2. flushSync(() => { addRows() })
	 *       // the rows have been added, so scrolling to the bottom scrolls to
	 *       // the last synchronously added element
	 *    3. window.setTimeout(() => {
	 *          // scroll logic here
	 *       }, **some small number**)
	 */
	function tabListener(e: KeyboardEvent) {
		if (!e.shiftKey && e.key === "Tab" && e.target === focusRef.current) {
			flushSync(() => {
				addRows();
			});

			window.scrollTo({
				top: focusRef.current.getBoundingClientRect().top + 100,
				behavior: "smooth",
			});
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
