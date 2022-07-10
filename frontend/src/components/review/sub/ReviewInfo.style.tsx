import styled from "styled-components";

export const Summary = styled.summary`
	opacity: 1;
	outline: none;
	list-style: none;
	outline: 2px solid #111;
	width: max-content;
	padding: 1rem;
	background-color: #252525;
	background-attachment: fixed;
	user-select: none;
	color: smokewhite;
	font-weight: 600;

	transition: all 120ms ease;
	border: 1px solid transparent;

	&::-webkit-details-marker {
		display: none;
		color: smokewhite;
	}

	&::before {
		display: inline-flex;
		font-size: 0.8rem;
		width: 30px;
		font-weight: 400;
		background-color: #444;
		padding: 0.3rem 1rem;
		justify-content: center;
		align-items: center;
		border-radius: 2px;
	}

	&:hover {
		&::before {
			box-shadow: 0 0 0.3rem black;
		}
	}
`;

export const ReviewInfo = styled.details`
	display: block;
	width: max-content;
	margin-top: 2rem;
	box-shadow: 0 0 0.5em black;
	border-radius: 3px 0 0 0;

	transition: all 100ms ease;

	&:open {
		width: minmax(max-content, 100%);

		${Summary} {
			width: 100%;
			border-bottom: 1px solid smokewhite;
			background-color: #111;

			transition: all 100ms linear;

			&::before {
				content: hide;
			}
		}
	}

	&:not(:open) {
		${Summary} {
			&:hover {
				background-color: #333;
			}
		}
	}
`;

export const Header = styled.span`
	padding-left: 0.5rem;
`;

export const Datum = styled.div`
	padding: 1rem;
`;
