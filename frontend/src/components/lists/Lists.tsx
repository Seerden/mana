import useRouteProps from "hooks/useRouteProps";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import useLists from "./hooks/useLists";
import * as S from "./Lists.style";

function Lists() {
	const { params } = useRouteProps();

	const userString = useMemo(() => `/u/${params.username}`, [params.username]);

	const {
		lists,
		filteredListsElement,
		handleFilterChange,
		handleSelectChange,
		filter,
		sortBy,
	} = useLists();

	return (
		<>
			{lists?.length > 0 && (
				<div className="PageWrapper">
					<div className="PageHeader">
						Lists by
						{/* TODO: does .Link have any styles? */}
						<Link className="Link" to={userString}>
							{userString}
						</Link>
					</div>

					<S.UserPageLink to={`${userString}/lists/new`}>
						Create a new list
					</S.UserPageLink>

					<S.Header>
						<S.Filter>
							<S.FilterLabel htmlFor="filter">Filter lists by name</S.FilterLabel>

							<S.FilterInput
								autoFocus
								onChange={handleFilterChange}
								placeholder="e.g. 'vocabulary'"
								type="text"
								name="filter"
								value={filter}
							/>
						</S.Filter>

						<S.Sort>
							<S.SortLabel htmlFor="sort">Sort lists by</S.SortLabel>

							<S.SortSelect
								onChange={handleSelectChange}
								value={sortBy}
								name="sort"
							>
								<option value="name">name</option>
								<option value="created">creation date</option>
								<option value="lastReviewed">last review date</option>
							</S.SortSelect>
						</S.Sort>
					</S.Header>

					<section>
						<S.Heading>All lists</S.Heading>

						<S.Lists>{filteredListsElement}</S.Lists>
					</section>
				</div>
			)}

			{lists?.length === 0 && (
				<div className="PageWrapper">
					<div className="PageHeader">
						Lists by{" "}
						<Link className="Link" to={userString}>
							/u/{params.username}
						</Link>
					</div>

					<div>It appears you don't have any lists.</div>

					<S.UserPageLink to={`${userString}/lists/new`}>
						Create a new list
					</S.UserPageLink>
				</div>
			)}
		</>
	);
}

export default Lists;
