import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteProps } from '../../hooks/routerHooks';
import { getLists } from '../../helpers/db.api';
import { useLogState } from '../../hooks/state';
import ListsItem from './ListsItem';
import './Lists.css'

const Lists = memo((props) => {
    const [filter, setFilter] = useState('');
    const [lists, setLists] = useState(null);
    const [listsElement, setListsElement] = useState(null);
    const [sortBy, setSortBy] = useState('created');
    const { params } = useRouteProps();

    useEffect(() => { getLists(params.username).then(res => setLists(res)) }, [])
    useEffect(() => { if (lists) { setListsElement(makeListsElement(lists)) } }, [lists])

    const handleFilterChange = e => {
        let val = e.currentTarget.value;
        setFilter(val.length > 0 ? val : '')
    }

    const handleSelectChange = e => {
        setSortBy(e.currentTarget.value)
    }

    const makeListsElement = (lists) => {
        return lists.map(l => ({
            name: l.name,
            lastReviewed: l.lastReviewed,
            created: l.created,
            element: <ListsItem key={l._id} list={l} />
        }))
    }

    return (
        <>
            { !lists && 
                <div className="PageWrapper">
                    Loading lists..
                </div>
            }

            { lists && lists.length > 0 &&
                <div className="PageWrapper">
                    <div className="PageHeader">Lists by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link></div>
                    <button className="Button"><Link to={`/u/${params.username}/lists/new`}>Make a new list</Link></button>

                    <div className="Lists__header">
                        <div className="Lists__filter">
                            <label htmlFor="filter" id="Lists__filter--label">Filter lists by name</label>
                            <input
                                autoFocus
                                onChange={handleFilterChange}
                                placeholder="e.g. 'chapter 2'"
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

                    <div className="Lists">

                        {listsElement &&
                            listsElement
                                .filter(l => l.name.toLowerCase().includes(filter.toLowerCase()))
                                .sort((first, second) => first[sortBy] < second[sortBy] ? -1 : 1)  // TODO: sort by lowercase, sort out undefined cases (lastReviewed may be undefined
                                .map(l => l.element)
                        }

                    </div>
                </div>

            }

            { lists && lists.length === 0 &&
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