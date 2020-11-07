import React, { useState, useEffect, useMemo } from "react";
import { handleError, handleResponse } from "../../helpers/apiHandlers/apiHandlers";
import { getLists } from "../../helpers/apiHandlers/listHandlers";
import { useRequest } from "../../hooks/useRequest";
import { useRouteProps } from '../../hooks/routerHooks';
import './style/NewSet.scss';

import Picker from './Picker';


const NewSet = (props) => {
    const [newSet, setNewSet] = useState({}),
        { params } = useRouteProps(),
        { response, setRequest } = useRequest({ handleError, handleResponse }),
        lists = useMemo(() => {
            return response
        }, [response])

    useEffect(() => {
        setRequest(() => getLists(params.username))
    }, [])
    

    const handleBlur = (e) => {
        e.persist();
        let name = e.target.getAttribute('name');
        setNewSet(newSet => (
            {
                ...newSet,
                [name]: e.target.value || e.target.innerText
            }
        ));
    }

    return (
        <div className="NewSet">
            <form className="NewSet__form">
                <div className="NewSet__header">New set</div>

                <div className="NewSet__form--fields">
                    <div className="NewSet__field--name">
                        <label
                            className="NewSet__label"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            onBlur={handleBlur}
                            tabIndex="1"
                            spellCheck="false"
                            className="NewSet__name"
                            type="text"
                            name="name"
                        />
                    </div>

                    <div className="NewSet__field--desc">
                        <label
                            className="NewSet__label"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <div
                            onBlur={handleBlur}
                            tabIndex="2"
                            contentEditable
                            spellCheck="false"
                            name="description"
                            cols="30"
                            rows="5"
                            className="NewSet__description" 
                            suppressContentEditableWarning={true}
                        />
                    </div>

                    <div className="NewSet__field--lists">
                        <div className="NewSet__lists">
                            <label htmlFor="lists" className="NewSet__label">Lists to include in the set</label>
                            <Picker />
                        </div>
                    </div>

                </div>

                <input 
                    className="NewSet__submit"
                    type="button" 
                    value="Create set"
                />
            </form>
        </div>
    )
}

export default NewSet