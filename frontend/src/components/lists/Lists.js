import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Lists.css'
import { useRouteProps } from '../../hooks/routerHooks';
import { getListsByUser } from '../../helpers/db.api';

const Lists = memo((props) => {
    const { params, location } = useRouteProps();
    const [lists, setLists] = useState(null);
    const [filter, setFilter] = useState('');
    const [elements, setElements] = useState(null);

    useEffect(() => {  // get lists from db on component mount, build JSX
        getListsByUser(params.username)
            .then(r => {
                setLists(r);
                setElements(makeListsEl(r, filter))
            })
            .catch(e => e)
    }, [])

    const makeListsEl = (lists, filter) => {
        return lists
            .map((l, idx) => {
                let condition = (filter && filter.length > 0 && (l.name).toLowerCase().includes(filter.toLowerCase()))
                if (condition || filter.length === 0 || filter === '') {
                    return (
                        <div key={`link-list-${idx}`} className="Link-div">
                            <div className="Link-div__link">
                                <Link className="Lists-link" to={`/list/${l._id}`}>{l.name}</Link>
                            </div>
                            <div className="Lists__list--languages"><span>{l.from}</span><span>{l.to}</span></div>
                        </div>
                    )
                }
            })
            .filter(el => el !== undefined)
    }
    const handleFilterChange = (e) => {
        let val = e.currentTarget.value
        setFilter(val)
        setElements(makeListsEl(lists, val))  
            /*  @todo:  currently this is rebuilding the whole lists element
                        instead, have the initial setElements call (on mount) return an object with a filterable property, 
                        to prevent rebuilding list every time */
    }

    return (
        <div className="ListsByUser">
            <h1 className="PageHead">
                Lists by u/{params.username}
            </h1>
            <Link className="Link-button" to={`${location.pathname}/new`}>New</Link>

            { !lists &&
                <div>Loading lists...</div>
            }

            { lists &&
                <div className="Lists__filter">

                    <span id="Lists__filter--value">
                        {filter ? `Filtering by '${filter}'` : `Showing all lists`}
                    </span>
                    <input
                        autoFocus
                        onChange={handleFilterChange}
                        placeholder="filter lists by name"
                        id="Lists__filter--filter"
                        type="text"
                        name="filter"
                        value={filter}
                    />

                </div>
            }

            { lists &&
                <div className="Lists__wrapper">
                    {elements}
                </div>
            }
        </div>
    )
})

export default Lists;

// @ TODO | memoize lists so I don't have to call DB every single time