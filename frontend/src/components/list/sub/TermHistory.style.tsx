import styled from "styled-components";

export const History = styled.div``;

export const Description = styled.div`
	display: inline-block;
`;
export const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

// histel
export const Direction = styled.span`
	margin-right: 1rem;
	padding: 0.2rem 0.6rem;
	border-radius: 3px;
`;

export const ExpandButton = styled.button`
	display: block;
	border: none;
	border-radius: 3px;
	outline: none;
	background-color: ${(p) => p.theme.colors.dark.grey.regular};
	color: ${(p) => p.theme.colors.light.white};
	padding: 0.5rem;
	margin: 0.5rem 0;
	width: 100px;

	transition: all 50ms ease;

	&:hover:not(:active) {
		background-color: ${(p) => p.theme.colors.dark.grey.darker};
		color: white;
		transform: translateY(-1px);
		box-shadow: 0 0.4rem 0 -0.3rem ${(p) => p.theme.colors.dark.grey.regular},
			0 3px 0.5rem 0 ${(p) => p.theme.colors.dark.black};
	}

	&:active {
		background-color: ${(p) => p.theme.colors.dark.grey.light};
		transform: translateY(0);
	}
`;

export const HistorySession = styled.div`
	display: flex;
	margin-right: 0.5rem;
	align-items: center;
	justify-content: space-between;

	&:not(:nth-last-of-type(1)) {
		border-bottom: 1px solid ${(p) => p.theme.colors.dark.dark};
	}

	padding: 0.5rem 0.5rem;
	padding-right: 2rem;
`;

export const HistorySessionBlock = styled.div`
	display: flex;
	align-items: center;

	* {
		display: flex;
		height: 100%;
	}
`;

export const HistoryContent = styled.ul`
	max-height: 200px;
	overflow-y: scroll;

	@media screen and (max-height: 700px) {
		max-height: 100px;
	}

	&::-webkit-scrollbar {
		background-color: ${(p) => p.theme.colors.dark.darker};
		width: 8px;

		&-thumb {
			background-color: ${(p) => p.theme.colors.dark.grey.regular};
			border-radius: 5px;
		}

		&-track {
			outline: 1px solid ${(p) => p.theme.colors.dark.grey.dark};
		}
	}
`;
