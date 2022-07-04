import styled from "styled-components";

export const PreReview = styled.div`
	width: 100%;
	max-width: 600px;
	margin: 10vh auto 0 auto;
	padding: 2rem;
	border: 2px solid blueviolet;
	border-radius: 12px;
	box-shadow: 0 0 1rem black, 1.3rem 1.3rem 0 -0.3rem #222;
`;

export const StartReviewButton = styled.input`
	display: flex;
	margin: 2rem auto 0 auto;
	padding: 0.5rem;
	border: none;
	outline: none;
	font-size: 0.9rem;

	color: white;
	background-color: blueviolet;
	border-radius: 3px;
	box-shadow: 0 0 0.3rem black;
	transition: all 40ms ease;

	&:hover {
		backface-visibility: hidden;
		box-shadow: 0 0.5rem 0 -0.4rem white, 0 0.2rem 0.5rem black;
		transform: translateY(-3px) translateZ(0px);
	}
`;

export const SettingsList = styled.ul`
	list-style: square;
	margin: 0;
	padding: 0;
	margin-left: 1rem;

	list-style: square;
	margin: 0;
	padding: 0;
	margin-left: 1rem;

	li {
		&::marker {
			color: blueviolet;
		}
	}
`;

export const Buttons = styled.div`
	display: block;
	padding-left: 1rem;
`;

export const SettingsLabel = styled.label`
	position: relative;
`;

export const SettingsTip = styled.p`
	width: 80%;
	margin: 0;
	margin-bottom: 0.5rem;
	/* text-align: right; */
	font-size: 0.7rem;
`;

// The options for `n` and `direction` are implemented as input[type=button] elements
export const SettingsButton = styled.input`
	display: inline-flex;
	text-align: center;
	justify-content: center;
	line-height: 1.2rem;
	margin-right: 3px;
	border: 2px solid transparent;
	outline: none;

	transition: all 50ms ease-in;

	width: ${(p) => (p.name === "n" ? "40px" : "max-content")};

	&:hover {
		backface-visibility: hidden;
		box-shadow: 0 0 0.5rem black, 0 -0.3rem 0 -0.1rem white;
		transform: translateY(2px) translateZ(1px);
	}
`;
