/* eslint-disable @typescript-eslint/ban-ts-comment */
import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import { useEffect } from "react";
import TermHistory from "../TermHistory/TermHistory";
import * as S from "./TermModal.style";

const TermModal = ({
	handleConfirmClick,
	setOpen,
	term,
	handleTermEdit,
	confirmingDelete,
	setConfirmingDelete,
}) => {
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

	const inputStyle = {
		backgroundColor: confirmingDelete ? "orangered" : "",
		boxShadow: !confirmingDelete ? "" : "0 0 1rem black",
		border: confirmingDelete ? "3px solid white" : "",
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
							title="Click to edit"
							type="text"
							//@ts-ignore
							side="from"
							disabled={confirmingDelete}
							style={inputStyle}
							onBlur={handleTermEdit}
							defaultValue={term.from}
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
							//@ts-ignore
							side="to"
							title="Click to edit"
							tabIndex={2}
							type="text"
							disabled={confirmingDelete}
							style={inputStyle}
							onBlur={handleTermEdit}
							defaultValue={term.to}
						/>
						<S.TermSaturation>
							<SaturationIcon
								direction={"forwards"}
								saturation={term.saturation?.forwards}
							/>
						</S.TermSaturation>
					</S.TermSide>
				</S.Section>

				<S.Section>
					<header> History </header>
					<TermHistory history={term.history} />
				</S.Section>

				<S.DeleteButtonWrapper>
					{!confirmingDelete ? (
						<S.DeleteButton onClick={() => setConfirmingDelete(true)}>
							Delete this term
						</S.DeleteButton>
					) : (
						<>
							<S.ConfirmDeleteLabel>Delete?</S.ConfirmDeleteLabel>
							<S.ConfirmDeleteButton
								confirm
								onClick={(e) => handleConfirmClick(e, { type: "delete" })}
							>
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
};

export default TermModal;
