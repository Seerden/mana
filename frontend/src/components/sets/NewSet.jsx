import React, { useState, useEffect, useMemo } from "react";
import { handleError, handleResponse } from "../../helpers/apiHandlers/apiHandlers";
import { postSet } from '../../helpers/apiHandlers/setHandlers';
import { useRequest } from "../../hooks/useRequest";
import { useRouteProps } from '../../hooks/routerHooks';
import Picker from './Picker';
import './style/NewSet.scss';
// import { useLogState } from "../../hooks/state";

const NewSet = (props) => {
    const [newSet, setNewSet] = useState({}),
        [pickedLists, setPickedLists] = useState([]),
        { params } = useRouteProps(),
        { response: postResponse, setRequest: setPostRequest } = useRequest({ handleError, handleResponse });

    // useLogState('newSet', newSet)

    useEffect(() => {
        if (pickedLists.length > 0) {
            setNewSet(newSet => ({ ...newSet, lists: pickedLists.map(i => i.id) }))
        }
    }, [pickedLists, setNewSet])

    function handleSubmit() {
        setPostRequest(() => postSet(params.username, { 
            ...newSet,
            owner: params.username,
        }))
    }

    function handleBlur(e) {
        e.persist();

        if ((e.target.value || e.target.innerText) || newSet[e.target.getAttribute('name')]) {
            setNewSet(newSet => (
                {
                    ...newSet,
                    [e.target.getAttribute('name')]: e.target.value || e.target.innerText
                }
            ));
        }
    }

    return (
        <div className="NewSet">
            <form className="NewSet__form">
                <div className="NewSet__header">New set</div>

                {!postResponse 
                    ?
                    <>

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
                                    <label
                                        htmlFor="lists"
                                        className="NewSet__label"
                                    >
                                        Lists to include in the set
                                </label>

                                    <Picker
                                        chosen={[pickedLists, setPickedLists]}
                                    />
                                </div>
                            </div>

                        </div>

                        <input
                            onClick={handleSubmit}
                            className="NewSet__submit"
                            type="button"
                            value="Create set"
                        />
                    </>
                    :
                    JSON.stringify(postResponse)
                }


            </form>
        </div>
    )
}

export default NewSet