/* eslint-disable @typescript-eslint/ban-ts-comment */
import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import { useEffect } from "react";
import { Term } from "../../../gql/codegen-output";
import useTermModal from "../hooks/useTermModal";
import * as S from "./TermModal.style";
import TermReviewHistory from "./TermReviewHistory";

type TermModalProps = {
	setOpen: (val: boolean) => void;
	term: Term;
	handleTermEdit: (e: any) => void; // TODO: type this
};

function TermModal({ setOpen, term, handleTermEdit }: TermModalProps) {
	const { handleDeleteTerm, confirmingDelete, setConfirmingDelete } = useTermModal(
		term.term_id
	);

	function closeModal(e) {
		if (e.currentTarget === e.target) {
			setOpen(false);
		}
	}

	function handleKeydown(e) {
		if (e.code === "Escape") {
			setOpen(false);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handleKeydown);
		return () => window.removeEventListener("keydown", handleKeydown);
	}, []);

	const sharedInputProps = {
		confirming: confirmingDelete,
		disabled: confirmingDelete,
		title: "Click to edit",
		type: "text",
	};

	return (
		<>
			<S.ModalWrapper onClick={closeModal} />
			<S.TermModal>
				<S.Section>
					<S.HeaderContainer>
						<S.Header>Term details</S.Header>
						<S.CloseModalButton title="Close modal" onClick={() => setOpen(false)}>
							x
						</S.CloseModalButton>
					</S.HeaderContainer>

					<S.Label htmlFor="front">{term.from_language} definition</S.Label>
					<S.TermSide>
						<S.Input
							tabIndex={1}
							name="front"
							data-field="from_value"
							defaultValue={term.from_value}
							onBlur={handleTermEdit}
							{...sharedInputProps}
						/>
						<S.TermSaturation>
							<SaturationIcon
								direction="backwards"
								saturation={term.saturation?.backwards}
							/>
						</S.TermSaturation>
					</S.TermSide>

					<S.Label htmlFor="back">{term.to_language} definition</S.Label>
					<S.TermSide>
						<S.Input
							name="back"
							data-field="to_value"
							tabIndex={2}
							defaultValue={term.to_value}
							onBlur={handleTermEdit}
							{...sharedInputProps}
						/>
						<S.TermSaturation>
							<SaturationIcon
								direction={"forwards"}
								saturation={term.saturation?.forwards}
							/>
						</S.TermSaturation>
					</S.TermSide>
				</S.Section>

				{term.history?.length > 0 && (
					<S.Section>
						<header> History </header>
						<TermReviewHistory history={term.history} />
					</S.Section>
				)}

				<S.DeleteButtonWrapper>
					{!confirmingDelete ? (
						<S.DeleteButton onClick={() => setConfirmingDelete(true)}>
							Delete this term
						</S.DeleteButton>
					) : (
						<>
							<S.ConfirmDeleteLabel>Delete?</S.ConfirmDeleteLabel>
							<S.ConfirmDeleteButton confirm onClick={() => handleDeleteTerm()}>
								Yes
							</S.ConfirmDeleteButton>
							<S.ConfirmDeleteButton onClick={() => setConfirmingDelete(false)}>
								No
							</S.ConfirmDeleteButton>
						</>
					)}
				</S.DeleteButtonWrapper>
			</S.TermModal>
		</>
	);
}

export default TermModal;
