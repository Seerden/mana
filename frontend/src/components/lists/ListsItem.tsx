import { List } from "gql/codegen-output";
import { timeSince } from "helpers/time";
import { useRouteProps } from "hooks/routerHooks";
import { memo } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { colorByLastReviewDate, getLastReviewDate } from "../../helpers/lists-helpers";
import * as S from "./ListsItem.style";

type ListsItemProps = {
	list: List;
};

const ListsItem = memo(({ list }: ListsItemProps) => {
	const { params } = useRouteProps();
	const termCount = list.terms.length;
	const lastReviewDate = getLastReviewDate(list);
	const timeAgo = timeSince(lastReviewDate);
	const borderColor = colorByLastReviewDate(lastReviewDate);

	return (
		// TODO: this style prop can be a Styled component prop, instead, but I
		// don't mind having it here, for now.
		<S.List style={{ borderColor }}>
			<S.ListName>
				{/* TODO: Should have a StyledDefaultLink component somewhere because these Link className="Link" are everywhere */}
				<Link className="Link" to={`/u/${params.username}/list/${list._id}`}>
					{list.name}
				</Link>
			</S.ListName>

			<S.TermCount>{termCount} terms</S.TermCount>

			<S.ListLanguages>
				{list.from} <BiArrowToRight /> {list.to}{" "}
			</S.ListLanguages>

			{list.sessions?.length > 0 && (
				<S.SinceReview>
					<em>last reviewed {timeAgo}</em>
				</S.SinceReview>
			)}
		</S.List>
	);
});

export default ListsItem;
