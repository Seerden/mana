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

	if (!lists) return <></>;

	if (lists?.length === 0) {
		return (
			<div className="PageWrapper">
				<div className="PageHeader">
					Lists by{" "}
					<Link className="Link" to={userString}>
						/u/{params.username}
					</Link>
				</div>

				<div>It appears you don't have any lists.</div>

				<S.NewListLink to={`${userString}/lists/new`}>
					Create a new list
				</S.NewListLink>
			</div>
		);
	}

	if (lists?.length > 0) {
		return (
			<div className="PageWrapper">
				<S.Title>
					Lists by {/* TODO: does .Link have any styles? */}
					<Link className="Link" to={userString}>
						{userString}
					</Link>
				</S.Title>

				<S.NewListLink to={`${userString}/lists/new`}>
					Create a new list
				</S.NewListLink>

				<S.Header>
					<S.Filter>
						<S.FilterLabel htmlFor="filter">Filter lists by name</S.FilterLabel>

						<S.FilterInput
							type="text"
							autoFocus
							placeholder="e.g. 'vocabulary'"
							name="filter"
							value={filter}
							onChange={handleFilterChange}
						/>
					</S.Filter>

					<S.Sort>
						<S.SortLabel htmlFor="sort">Sort lists by</S.SortLabel>

						<S.SortSelect onChange={handleSelectChange} value={sortBy} name="sort">
							<option value="name">name</option>
							<option value="created">creation date</option>
							<option value="last_reviewed">last review date</option>
						</S.SortSelect>
					</S.Sort>
				</S.Header>

				<section>
					<S.Heading>All lists</S.Heading>

					<S.Lists>{filteredListsElement}</S.Lists>
				</section>
			</div>
		);
	}
}

export default Lists;
