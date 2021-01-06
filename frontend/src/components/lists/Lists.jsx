import React, { memo, useState, useMemo, useEffect } from 'react';
import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useRouteProps } from 'hooks/routerHooks';
import { useRequest } from 'hooks/useRequest';
import { handleError, handleResponse } from 'helpers/apiHandlers/apiHandlers';
import { getLists } from 'helpers/apiHandlers/listHandlers'
import ListsItem from './ListsItem';

import './style/Lists.scss';


const Lists = memo((props) => {
    const
        [filter, setFilter] = useState(''),
        [sortBy, setSortBy] = useState('name'),
        { params } = useRouteProps(),
        { response: lists, setRequest } = useRequest({ handleError, handleResponse }),
        listsElement = useMemo(() => { if (lists) return makeListsElement(lists) }, [lists]),
        listCount = lists?.length,
        reviewedCount = lists?.filter(list => list.sessions.length > 0)?.length;

    // request Lists on mount
    useEffect(() => {
        setRequest(() => getLists(params.username))
    }, [])

    function handleFilterChange(e) {
        let val = e.currentTarget.value;
        setFilter(val.length > 0 ? val : '');
    }

    function handleSelectChange(e) {
        setSortBy(e.currentTarget.value);
    }

    function makeListsElement(lists) {
        return lists.map(l => ({
            name: l.name,
            state: l.state,
            lastReviewed: l.lastReviewed,
            created: l.created,
            element: <ListsItem key={l._id} list={l} />
        }));
    }


    return (
        <>
            { lists?.length > 0 &&
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

                    {/* ---- ACTIVE LISTS SECTION */}
                    <section className="Lists__active">
                        <header className="Lists__heading">Active lists</header>
                        <div className="Lists__lists">
                            {listsElement
                                .filter(l => {
                                    return (
                                        l.state.forwards !== 'untouched' || l.state.backwards !== 'untouched'
                                    )
                                })
                                .sort((first, second) => first[sortBy] < second[sortBy] ? -1 : 1)  // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined)
                                .map(l => l.element)
                            }
                        </div>
                    </section>
                    {/* END ACTIVE LISTS SECTION ---- */}

                    {/* ---- ALL LISTS SECTION */}
                    <section className="Lists__all">
                        <header className="Lists__heading">All lists</header>
                        <div className="Lists__lists">
                            {listsElement &&
                                listsElement
                                    .filter(l => l.name.toLowerCase().includes(filter.toLowerCase()))
                                    .sort((first, second) => first[sortBy] < second[sortBy] ? -1 : 1)  // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined)
                                    .map(l => l.element)
                            }
                        </div>
                    </section>
                    {/* END ALL LISTS SECTION ---- */}

                </div>

            }

            { lists?.length === 0 &&
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