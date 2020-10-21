import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouteProps } from '../../hooks/routerHooks';
import { getListsByUser } from '../../helpers/db.api';
import { useLogState } from '../../hooks/state';
import ListsItem from './ListsItem';
import './Lists.scss'

const Lists = memo((props) => {
    const [filter, setFilter] = useState('');
    const [lists, setLists] = useState(null);
    const [listsElement, setListsElement] = useState(null);
    const { params } = useRouteProps();

    useEffect(() => { getListsByUser(params.username).then(res => setLists(res)) }, [])
    useEffect(() => { if (lists) { setListsElement(makeListsElement(lists)) } }, [lists])

    const handleFilterChange = e => {
        let val = e.currentTarget.value;
        setFilter(val.length > 0 ? val : '')
    }

    const makeListsElement = (lists) => {
        return lists.map(l => ({ name: l.name, element: <ListsItem key={l._id} list={l} /> }))
    }

    return (
        <>

            { lists &&
                <div className="Lists__wrapper">
                    <div className="Lists__header">Lists by <Link className="Link" to={`/u/${params.username}`}>/u/{params.username}</Link></div>

                    <label htmlFor="filter" id="Lists__filter--label">Filter by name:</label>
                    <input
                        autoFocus
                        onChange={handleFilterChange}
                        placeholder="e.g. 'chapter 2'"
                        id="Lists__filter"
                        type="text"
                        name="filter"
                        value={filter}
                    />

                    <div className="Lists">

                        {listsElement &&
                            listsElement
                                .filter(l => l.name.toLowerCase().includes(filter.toLowerCase()))
                                .map(l => l.element)
                        }

                    </div>
                </div>
            }
        </>
    )
})

export default Lists;