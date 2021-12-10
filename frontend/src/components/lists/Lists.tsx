import { useRouteProps } from "hooks/routerHooks";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Lists.scss";
import useLists from "./useLists";

const Lists = memo((props) => {
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
            {lists && lists?.length > 0 && (
                <div className="PageWrapper Lists">
                    <div className="PageHeader">
                        Lists by{" "}
                        <Link className="Link" to={userString}>
                            {userString}
                        </Link>
                    </div>

                    <Link className="Lists__new--button" to={`${userString}/lists/new`}>
                        Create a new list
                    </Link>

                    <div className="Lists__header">
                        <div className="Lists__filter">
                            <label htmlFor="filter" id="Lists__filter--label">
                                Filter lists by name
                            </label>

                            <input
                                autoFocus
                                onChange={handleFilterChange}
                                placeholder="e.g. 'vocabulary'"
                                id="Lists__filter"
                                type="text"
                                name="filter"
                                value={filter}
                            />
                        </div>

                        <div className="Lists__sort">
                            <label id="Lists__sort--label" htmlFor="sort">
                                Sort lists by
                            </label>

                            <select
                                onChange={handleSelectChange}
                                value={sortBy}
                                name="sort"
                            >
                                <option value="name">name</option>
                                <option value="created">creation date</option>
                                <option value="lastReviewed">last review date</option>
                            </select>
                        </div>
                    </div>

                    <section className="Lists__all">
                        <header className="Lists__heading">All lists</header>

                        <div className="Lists__lists">{filteredListsElement}</div>
                    </section>
                </div>
            )}

            {lists?.length === 0 && (
                <div className="PageWrapper">
                    <div className="PageHeader">
                        Lists by{" "}
                        <Link className="Link" to={`/u/${params.username}`}>
                            /u/{params.username}
                        </Link>
                    </div>

                    <div className="Lists__new">It appears you don't have any lists.</div>

                    <Link
                        className="Lists__new--button"
                        to={`/u/${params.username}/lists/new`}
                    >
                        Create a new list
                    </Link>
                </div>
            )}
        </>
    );
});

export default Lists;
