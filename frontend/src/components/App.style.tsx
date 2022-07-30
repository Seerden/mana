import styled from "styled-components";

export const App = styled.main`
	padding: 0 2rem;
	padding-bottom: 2rem;
	@media screen and (max-width: 768px) {
		padding: 0.5rem;
	}

	margin: 2rem;
	padding-bottom: 3rem;

	@media screen and (max-width: 768px) {
		margin: 0.2rem;
	}

	margin-top: calc(
		75px + 1rem
	); // matches header height plus a little bit of actual margin;
`;
