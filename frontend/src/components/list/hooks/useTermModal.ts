import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { List, Term } from "../../../gql/codegen-output";
import { useDeleteTerms } from "../../../gql/hooks/term/useDeleteTerms";
import useRouteProps from "../../../hooks/useRouteProps";

export default function useTermModal(term_id: Term["term_id"]) {
	const { mutate: mutateDelete } = useDeleteTerms();
	const { params } = useRouteProps();
	const client = useQueryClient();

	const [confirmingDelete, setConfirmingDelete] = useState(false);

	function handleDeleteTerm() {
		mutateDelete([term_id], {
			onSuccess: ([deletedTerm]) => {
				client.setQueryData(["listsById", +params.id], ([cur]: List[]) => {
					return [
						{
							...cur,
							terms: cur.terms.filter(
								(term) => term.term_id !== deletedTerm.term_id
							),
						},
					];
				});
			},
		});
	}

	return { handleDeleteTerm, confirmingDelete, setConfirmingDelete } as const;
}
