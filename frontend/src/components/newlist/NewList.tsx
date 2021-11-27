import { memo } from "react";
import cs from "./NewList.module.scss";
import { BiArrowToRight } from "react-icons/bi";
import { useNewList } from "./useNewList";

const NewList = memo(() => {
	const { handleBlur, addRows, handleSubmit, termInputs, newList } = useNewList();

	return (
		<div className="NewList">
			<div className="PageHeader">New List</div>

			<form className={cs.Form}>
				<section className={cs.Name}>
					<label className={cs.Name__label}>List name</label>
					<input
						className={cs.Name__input}
						onBlur={handleBlur}
						type="text"
						name="name"
						placeholder="week 3 vocabulary"
					/>

					<div className={cs.Languages}>
						<div className={cs.Language}>
							<label htmlFor="from" className={cs.Language__label}>
								Original language
							</label>
							<input
								className={cs.Language__input}
								onBlur={handleBlur}
								type="text"
								name="from"
								placeholder="Klingon"
							/>
						</div>
						<BiArrowToRight className={cs.Language__icon} />

						<div className={cs.Language}>
							<label htmlFor="to" className={cs.Language__label}>
								Target language
							</label>
							<input
								className={cs.Language__input}
								onBlur={handleBlur}
								type="text"
								name="to"
								placeholder="Elvish"
							/>
						</div>
					</div>
				</section>

				<section className={cs.Buttons}>
					<input
						className={cs.Button}
						onClick={() => addRows()}
						type="button"
						value="Add rows"
					/>
					<input
						className={cs.Button}
						onClick={handleSubmit}
						type="button"
						value="Create list"
					/>
				</section>

				<section className={cs.Terms}>
					{termInputs.length > 0 && (
						<>
							<div className={cs.Terms__header}>
								{newList && (
									<>
										<span className={cs.Terms__header_side}>{newList.from}</span>
										<span className={cs.Terms__header_side}>{newList.to}</span>
									</>
								)}
							</div>
							{termInputs}
						</>
					)}
				</section>
			</form>
		</div>
	);
});

export default NewList;
