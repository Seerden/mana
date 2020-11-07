import React, { memo, useState, useMemo, useEffect } from "react";
import { handleError, handleResponse } from "../../helpers/apiHandlers/apiHandlers";
import { getLists } from "../../helpers/apiHandlers/listHandlers";
import { useRequest } from "../../hooks/useRequest";
import { useRouteProps } from '../../hooks/routerHooks';
import './style/Picker.scss';
import { useLogState } from "../../hooks/state";

const Picker = memo((props) => {
    const { params } = useRouteProps();


    // @note: currently I've hardcoded lists, since I'm initially trying to implement this in Sets, where we need to pick lists
    // eventually, 'lists' will become an prop (e.g. 'inputArray')
    const { response, setRequest } = useRequest({ handleError, handleResponse });
    const lists = useMemo(() => response, [response]);
    const options = useMemo(() => lists && makeItems(lists), [lists]);
    const [filter, setFilter] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [picked, setPicked] = useState([]);

    useLogState('picked', picked)

    function handleClick(e) {
        e.persist();
        setPicked(picked => [...picked, {name: e.target?.innerText, id: e.target?.getAttribute('_id')}])

    }
    function makeItems(input) {
        return input?.map(item => (
            {
                name: item.name,
                id: item._id,
                element: <PickerElement key={item._id} handleClick={handleClick} id={item._id} name={item.name} />
            }
        ));
    }

    useEffect(() => {
        setRequest(() => getLists(params.username))
    }, [])

    return (
        <div 
            className="Picker"
        >
            <input
                onChange={(e) => setFilter(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}  // without delay, doesn't capture the click, since isFocused goes to false immediately
                type="text"
                className="Picker__filter"
                defaultValue={filter}
                placeholder="filter lists"
            />

            <div className="Picker__elements--wrapper">
                    <div 
                        className="Picker__elements"
                    >
                        {isFocused && filter && 
                            options
                                ?.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))
                                // .filter(i => i)  // filter out already picked lists
                                .slice(0,)
                                .map(i => i.element)}
                    </div>
                
            </div>
            
            {picked &&
                <div className="Picker__chosen">
                    {picked.map(i => <div key={`picked-${i.name}`}>{i.name}</div>)}
                </div>
            }
        </div>
    )
})

export default Picker

const PickerElement = memo(({ name, id, handleClick}) => {
    return (
        <div 
            _id={id}
            onClick={handleClick}
            className="PickerElement"
        >
            {name}
        </div>
    )

})