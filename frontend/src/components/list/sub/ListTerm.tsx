import { Key, useState } from "react";
import { Term } from "../../../gql/codegen-output";
import SaturationIcon from "../../SaturationFilter/SaturationIcon";
import { useListTerm } from "../hooks/useListTerm";
import * as S from "./ListTerm.style";
import TermModal from "./TermModal";

interface TermPropsInterface {
	idx: number;
	term: Term;
	key?: Key;
}

function ListTerm({ term: termFromProps, idx }: TermPropsInterface) {
	const [term, setTerm] = useState<typeof termFromProps>(() => termFromProps);
	const { open, setOpen, handleTermEdit } = useListTerm({ term, idx, setTerm });

	return (
		<>
			<S.Term title="Click to expand" onClick={() => setOpen(true)}>
				<S.TermIndex>{idx + 1}</S.TermIndex>
				<span>{term.from_value}</span>
				<span>{term.to_value}</span>

				<S.TermSaturation>
					<SaturationIcon
						direction="forwards"
						saturation={term.saturation?.forwards}
					/>
				</S.TermSaturation>
				<S.TermSaturation>
					<SaturationIcon
						direction="backwards"
						saturation={term.saturation?.backwards}
					/>
				</S.TermSaturation>
			</S.Term>

			{open && (
				<TermModal setOpen={setOpen} term={term} handleTermEdit={handleTermEdit} />
			)}
		</>
	);
}

export default ListTerm;

/* FIXME: deleting only term in a list doesn't update visible terms (but does update the database entry, so problem lies in a key or a render based on .length > 0) */
