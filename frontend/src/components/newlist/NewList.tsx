import { useNewList } from "./hooks/useNewList";
import * as S from "./NewList.style";

function NewList() {
	const { handleBlur, addRows, handleSubmit, termInputs, newList, buttonsRef, isStuck } =
		useNewList();

	return (
		<div>
			<S.Form>
				<S.Title style={{ gridArea: "title" }}>New List</S.Title>
				<S.MetaSection>
					<S.NameSubsection>
						<S.SectionLabel htmlFor="name">List name</S.SectionLabel>
						<S.NameInput
							onChange={handleBlur}
							type="text"
							name="name"
							placeholder="Chapter 3: Basic Sentences"
						/>
					</S.NameSubsection>

					<div>
						<S.SectionLabel>Languages</S.SectionLabel>
						<S.Languages>
							<div>
								<S.LanguageLabel htmlFor="from_language">
									Original language
								</S.LanguageLabel>
								<S.LanguageInput
									onChange={handleBlur}
									type="text"
									name="from_language"
									placeholder="Klingon"
								/>
							</div>
							<S.LanguageIcon size={25} />

							<div>
								<S.LanguageLabel htmlFor="to_language">
									Target language
								</S.LanguageLabel>
								<S.LanguageInput
									onChange={handleBlur}
									type="text"
									name="to_language"
									placeholder="Elvish"
								/>
							</div>
						</S.Languages>
					</div>
				</S.MetaSection>

				<S.Buttons style={{ gridArea: "buttons" }} ref={buttonsRef} isStuck={isStuck}>
					<S.Button onClick={() => addRows()} type="button" value="Add rows" />
					<S.Button onClick={handleSubmit} type="button" value="Create list" />
				</S.Buttons>

				<S.Section style={{ gridArea: "terms" }}>
					<S.SectionLabel>Terms</S.SectionLabel>
					{newList.from_language && newList.to_language && (
						<S.TermsHeader>
							<S.TermsHeaderSide>{`${newList.from_language} definition`}</S.TermsHeaderSide>
							<S.TermsHeaderSide>{`${newList.to_language} definition`}</S.TermsHeaderSide>
						</S.TermsHeader>
					)}
					{termInputs}
				</S.Section>
			</S.Form>
		</div>
	);
}

export default NewList;
