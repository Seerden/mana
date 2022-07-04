import { memo } from "react";
import * as S from "./NewList.style";
import { useNewList } from "./useNewList";

const NewList = memo(() => {
	const { handleBlur, addRows, handleSubmit, termInputs, newList } = useNewList();

	return (
		<div className="NewList">
			<div className="PageHeader">New List</div>

			<S.Form>
				<S.NameAndLanguages>
					<S.NameLabel>List name</S.NameLabel>
					<S.NameInput
						onBlur={handleBlur}
						type="text"
						name="name"
						placeholder="week 3 vocabulary"
					/>

					<S.Languages>
						<S.Language>
							<S.LanguageLabel htmlFor="from">Original language</S.LanguageLabel>
							<S.LanguageInput
								onBlur={handleBlur}
								type="text"
								name="from"
								placeholder="Klingon"
							/>
						</S.Language>
						<S.LanguageIcon />

						<S.Language>
							<S.LanguageLabel>Target language</S.LanguageLabel>
							<S.LanguageInput
								onBlur={handleBlur}
								type="text"
								name="to"
								placeholder="Elvish"
							/>
						</S.Language>
					</S.Languages>
				</S.NameAndLanguages>

				<S.Buttons>
					<S.Button onClick={() => addRows()} type="button" value="Add rows" />
					<S.Button onClick={handleSubmit} type="button" value="Create list" />
				</S.Buttons>

				<S.Terms>
					{termInputs.length > 0 && (
						<>
							<S.TermsHeader>
								{newList && (
									<>
										<S.TermsHeaderSide>{newList.from}</S.TermsHeaderSide>
										<S.TermsHeaderSide>{newList.to}</S.TermsHeaderSide>
									</>
								)}
							</S.TermsHeader>
							{termInputs}
						</>
					)}
				</S.Terms>
			</S.Form>
		</div>
	);
});

export default NewList;
