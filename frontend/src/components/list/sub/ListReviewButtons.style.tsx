import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	sharedLinkStyle,
	subsectionHeaderStyle,
	tempSectionStyle,
} from "../../../helpers/theme/theme";

// TODO: If we don't add any styles beyond extending a snippet, should we just
// define a component for the snippet and re-use that? That's much less flexible
// though, so I'm leaning towards 'no'.
export const ReviewButtons = styled.section`
	${tempSectionStyle}
`;

// TODO: same concern as above
export const Header = styled.header`
	${subsectionHeaderStyle}
`;

export const ReviewLink = styled(Link)`
	${sharedLinkStyle}

	&:not(:nth-of-type(1)) {
		margin-left: 0.5rem;
	}
`;
