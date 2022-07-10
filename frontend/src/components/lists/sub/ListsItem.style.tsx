import styled, { css } from "styled-components";

// Some of this component's subsections (ListLanguages, TermCount, SinceReview) have some specific shared styles.
const sharedSubsectionStyle = css`
	display: flex;
	align-items: center;
	font-size: 0.8rem;
`;

export const ListName = styled.div`
	font-size: 1.3rem;
	font-weight: 600;
	border-bottom: 1px solid #333; // TODO: could use theme value, but I want to redo theme colors so that this isn't such a wordy thing to type out every time
	padding-bottom: 0.3rem;
	margin-bottom: 0.3rem;
`;

export const TermCount = styled.div`
	${sharedSubsectionStyle};

	font-size: 0.9rem;
`;

// TODO: should this be a <li>?
export const List = styled.div`
	background-color: #202020;
	border-radius: 2px;
	border: 2px solid #444;
	box-shadow: 0em 0.3rem 1rem black;

	padding: 1rem;

	transition: background 200ms linear, box-shadow 100ms ease-in;
`;

export const ListLanguages = styled.div`
	gap: 0.5rem;
	${sharedSubsectionStyle};
`;

export const SinceReview = styled.div`
	${sharedSubsectionStyle};

	display: flex;
	color: #777;
	justify-content: flex-end;
`;
