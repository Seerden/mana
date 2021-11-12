import { useEffect } from "react";
import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import "./TermModal.scss";
import TermHistory from "../TermHistory/TermHistory";

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
			<div onClick={closeModal} className="TermModal__wrapper" />
			<div className="TermModal">
				<section>
					<div className="TermModal__header">
						<header>Term details</header>
						<button title="Close modal" onClick={() => setOpen(false)}>
							x
						</button>
					</div>

					<label htmlFor="front">Front:</label>
					<div className="TermModal__side">
						<input
							tabIndex={1}
							name="front"
							disabled={confirmingDelete}
							title="Click to edit"
							style={inputStyle}
							className={`TermModal__input`}
							onBlur={handleTermEdit}
							type="text"
							//@ts-ignore
							side="from"
							defaultValue={term.from}
						/>
						<span className="TermModal__side--saturation">
							<SaturationIcon
								direction="backwards"
								saturation={term.saturation?.backwards}
							/>
						</span>
					</div>

					<label htmlFor="back">Back:</label>
					<div className="TermModal__side">
						<input
							name="back"
							tabIndex={2}
							//@ts-ignore
							side="to"
							disabled={confirmingDelete}
							title="Click to edit"
							style={inputStyle}
							className={`TermModal__input`}
							onBlur={handleTermEdit}
							type="text"
							defaultValue={term.to}
						/>
						<span className="TermModal__side--saturation">
							<SaturationIcon
								direction={"forwards"}
								saturation={term.saturation?.forwards}
							/>
						</span>
					</div>
				</section>

				<section>
					<header> History </header>
					<TermHistory history={term.history} />
				</section>

				<div className="TermModal__delete--wrapper">
					{!confirmingDelete ? (
						<button
							onClick={() => setConfirmingDelete(true)}
							className="TermModal__delete"
						>
							Delete this term
						</button>
					) : (
						<>
							<div className="TermModal__delete--confirm">Delete?</div>
							<button
								onClick={(e) => handleConfirmClick(e, { type: "delete" })}
								className="TermModal__delete--confirm-yes"
							>
								Yes
							</button>
							<button
								onClick={() => setConfirmingDelete(false)}
								className="TermModal__delete--confirm-no"
							>
								No
							</button>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default TermModal;
