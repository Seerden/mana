import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { List, Term } from "../../../gql/codegen-output";
import useUpdateTermValues from "../../../gql/hooks/term/useUpdateTerm";

type Props = {
	term: Term;
	idx: number;
};

export function useListTerm({ term, idx }: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const { mutate: mutateUpdateTerms } = useUpdateTermValues();
	const client = useQueryClient();

	/**
	 * Fire a mutation to edit the term's 'from'/'to' value in the database, and
	 * update this value in listAtom.
	 */
	function handleTermEdit(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target;
		const { field } = e.currentTarget.dataset; // 'from_value' | 'to_value'

		if (!value || term[field] === value) return;

		mutateUpdateTerms(
			{
				updateOptions: [
					{
						term_id: term.term_id,
						[field]: value,
					},
				],
			},
			{
				onSuccess: ([updatedTerm]) => {
					// Update list in cache with new term value
					client.setQueryData<List[]>(
						["listsById", updatedTerm.list_id],
						([list]) => {
							return [
								{
									...list,
									terms: list.terms.map((oldTerm) => {
										return oldTerm.term_id !== updatedTerm.term_id
											? oldTerm
											: updatedTerm;
									}),
								},
							];
						}
					);
				},
			}
		);
	}
	return {
		open,
		setOpen,
		handleTermEdit,
	} as const;
}
