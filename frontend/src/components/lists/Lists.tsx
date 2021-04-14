import React, { memo, useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { handleError, handleResponse } from 'helpers/apiHandlers/apiHandlers';
import { getLists } from 'helpers/apiHandlers/listHandlers'
import ListsItem from './ListsItem';

import './style/Lists.scss';
import useLists from './useLists';


const Lists = memo((props) => {
    const
        { params } = useRouteProps(),
        {
            lists,
            filteredListsElement,
            handleFilterChange,
            handleSelectChange,
            setRequest,
            filter,
            sortBy
        } = useLists();

    useEffect(() => {  // request Lists on mount
        if (typeof setRequest === 'function') {
            setRequest(() => getLists(params.username))
        }
    }, [])

    return (
        <>
            {lists?.length > 0 &&
                <div className="PageWrapper Lists">
                    <div className="PageHeader">Lists by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link></div>
                    <button className="Button"><Link to={`/u/${params.username}/lists/new`}>Make a new list</Link></button>

                    <div className="Lists__header">
                        <div className="Lists__filter">
                            <label htmlFor="filter" id="Lists__filter--label">Filter lists by name</label>
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
                            <label id="Lists__sort--label" htmlFor="sort">Sort lists by</label>
                            <select onChange={handleSelectChange} value={sortBy} name="sort">
                                <option value="name">name</option>
                                <option value="created">creation date</option>
                                <option value="lastReviewed">last review date</option>
                            </select>
                        </div>
                    </div>

                    {/* ---- ALL LISTS ---- */}
                    <section className="Lists__all">
                        <header className="Lists__heading">All lists</header>
                        <div className="Lists__lists">
                            {filteredListsElement}
                        </div>
                    </section>

                </div>

            }

            {lists?.length === 0 &&
                <div className="PageWrapper">
                    <div className="PageHeader">Lists by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link></div>
                    <div className="Lists__new">
                        It appears you don't have any lists.
                    </div>
                    <button className="Button"><Link to={`/u/${params.username}/lists/new`}>Make a new list</Link></button>

                </div>
            }

        </>
    )
})

export default Lists;