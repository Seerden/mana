/* eslint-disable @typescript-eslint/ban-ts-comment */
import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import { useEffect } from "react";
import useTermModal from "../hooks/useTermModal";
import * as S from "./TermModal.style";
import TermReviewHistory from "./TermReviewHistory";

function TermModal({
	setOpen,
	term,
	handleTermEdit,
	confirmingDelete,
	setConfirmingDelete,
}) {
	const { handleDeleteTerm } = useTermModal(term.term_id);

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

					<S.Label htmlFor="front">Front:</S.Label>
					<S.TermSide>
						<S.Input
							tabIndex={1}
							name="front"
							data-field="from_language"
							defaultValue={term.from}
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

					<S.Label htmlFor="back">Back:</S.Label>
					<S.TermSide>
						<S.Input
							name="back"
							data-field="to_language"
							tabIndex={2}
							defaultValue={term.to}
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
