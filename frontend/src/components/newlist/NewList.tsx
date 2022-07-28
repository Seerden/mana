import { useNewList } from "./hooks/useNewList";
import * as S from "./NewList.style";

function NewList() {
	const { handleBlur, addRows, handleSubmit, termInputs, newList } = useNewList();

	return (
		<div>
			<S.Title>New List</S.Title>

			<S.Form>
				<S.NameAndLanguages>
					<S.NameLabel>List name</S.NameLabel>
					<S.NameInput
						onChange={handleBlur}
						type="text"
						name="name"
						placeholder="week 3 vocabulary"
					/>

					<S.NameLabel>Languages</S.NameLabel>
					<S.Languages>
						<S.Language>
							<S.LanguageLabel htmlFor="from_language">
								Original language
							</S.LanguageLabel>
							<S.LanguageInput
								onChange={handleBlur}
								type="text"
								name="from_language"
								placeholder="Klingon"
							/>
						</S.Language>
						<S.LanguageIcon size={25} />

						<S.Language>
							<S.LanguageLabel htmlFor="to_language">
								Target language
							</S.LanguageLabel>
							<S.LanguageInput
								onChange={handleBlur}
								type="text"
								name="to_language"
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
					{termInputs.length && (
						<>
							<S.TermsHeader>
								{newList && (
									<>
										<S.TermsHeaderSide>
											{newList.from_language}
										</S.TermsHeaderSide>
										<S.TermsHeaderSide>{newList.to_language}</S.TermsHeaderSide>
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
}

export default NewList;
