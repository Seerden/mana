import { Key, memo, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { Term } from "../../../gql/codegen-output";
import SaturationIcon from "../../SaturationFilter/SaturationIcon";
import { useListTerm } from "../hooks/useListTerm";
import * as S from "./ListTerm.style";
import TermModal from "./TermModal";

interface TermPropsInterface {
	idx: number;
	term: Term;
	key: Key;
	handleTermDelete(idx: number): void;
}

const ListTerm = memo(
	({ handleTermDelete, term: termFromProps, idx }: TermPropsInterface) => {
		const [term, setTerm] = useState<typeof termFromProps>(() => termFromProps);
		const {
			open,
			setOpen,
			selectingTerms,
			selected,
			handleSelect,
			handleConfirmClick,
			handleTermEdit,
			confirmingDelete,
			setConfirmingDelete,
		} = useListTerm({ term, handleTermDelete, idx, setTerm });

		return (
			<div className="ListTerm">
				<S.Term title="Click to expand" onClick={() => setOpen(true)}>
					<S.TermIndex>{idx + 1}</S.TermIndex>
					<span>{term.from}</span>
					<span>{term.to}</span>

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

					{selectingTerms ? (
						<S.TermSelect selected={selected} onClick={handleSelect}>
							{selected ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
						</S.TermSelect>
					) : (
						""
					)}
				</S.Term>

				{open && (
					<TermModal
						{...{
							handleConfirmClick,
							setOpen,
							term,
							handleTermEdit,
							confirmingDelete,
							setConfirmingDelete,
						}}
					/>
				)}
			</div>
		);
	}
);

export default ListTerm;

/* FIXME: deleting only term in a list doesn't update visible terms (but does update the database entry, so problem lies in a key or a render based on .length > 0) */
