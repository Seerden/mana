import { List } from "gql/codegen-output";
import { timeSince } from "helpers/time";
import { useRouteProps } from "hooks/routerHooks";
import { memo } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { colorByLastReviewDate, getLastReviewDate } from "../../helpers/lists-helpers";
import "./ListsItem.scss";

type ListsItemProps = {
	list: List;
};

const ListsItem = memo(({ list }: ListsItemProps) => {
	const { params } = useRouteProps();
	const numTerms = list.terms.length;
	const lastReviewDate = getLastReviewDate(list);
	const timeAgo = timeSince(lastReviewDate);
	const borderColor = colorByLastReviewDate(lastReviewDate);

	return (
		<div style={{ borderColor }} className="ListsItem">
			<div className="ListsItem__name">
				<Link className="Link" to={`/u/${params.username}/list/${list._id}`}>
					{list.name}
				</Link>
			</div>

			<div className="ListsItem__numTerms">{numTerms} terms</div>

			<div className="ListsItem__languages">
				{list.from} <BiArrowToRight /> {list.to}{" "}
			</div>

			{list.sessions?.length > 0 && (
				<div className="ListsItem__since">
					<em>last reviewed {timeAgo}</em>
				</div>
			)}
		</div>
	);
});

export default ListsItem;
