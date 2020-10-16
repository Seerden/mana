import React, { useState, useEffect, memo } from 'react';
import { useRouteProps } from '../hooks/routerHooks';
import axios from 'axios';

import './css/NewList.css';
import NewListTerm from './NewListTerm';
import LanguageInput from './LanguageInput';

const NewList = memo((props) => {
    const { params } = useRouteProps();
    const [numTerms, setNumTerms] = useState(10)  // @TODO: allow user to set default number of terms when making new list
    const termEls = [];
    const [formOutput, setFormOutput] = useState(() => (
        {
            listName: "",
            languages: { from: "", to: "" },
            content: new Array(numTerms)
        })
    )

    useEffect(() => {
        if (formOutput.content.filter(i => i !== null).length > 0 || formOutput.languages.from !== "" || formOutput.languages.to !== "") {
            console.log(formOutput)
        }
    }, [formOutput])

    for (let i = 0; i < numTerms; i++) {
        termEls.push(
            <div key={`NewList-term-${i}`} className="NewList__Terms-term">
                <div className="NewList__Terms-index">{i + 1}</div>
                <NewListTerm index={i + 1} formOutput={formOutput} setFormOutput={setFormOutput} />
            </div>
        )
    }

    const handleAddRows = e => {
        e.preventDefault();
        setNumTerms(numTerms + 10);
    }

    const handleBlur = e => {
        e.preventDefault();
        const t = e.currentTarget;
        if (t.value && t.value !== formOutput.listName) {
            console.log(t.value)
            setFormOutput({ ...formOutput, listName: t.value })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        // listOwner, listName, listFrom, listTo, listContent
        axios.post('/db/list', {
            newList: {
                owner: params.username, // @TODO: replace
                name: formOutput.listName,
                from: formOutput.languages.from,
                to: formOutput.languages.to,  // @TODO: make array input, also needs handleBlur() to be modified
                content: formOutput.content.filter(i => i !== null)
            }
        })
    }

    return (
        <div className="NewList">
            <header>
                <h1 className="PageHeader">
                    New List
                </h1>
            </header>

            <form className="Form">
                <LanguageInput formOutput={formOutput} setFormOutput={setFormOutput} />
                <div className="NewList__name">
                    <label htmlFor="name">List name:</label>
                    <input onBlur={handleBlur} type="text" name="name" id="" />
                </div>
                <div className="NewList__Header">
                    <span>Definition</span>
                    <span>Meaning</span>
                </div>
                <div className="NewList__Terms">
                    {termEls.length > 0 && termEls}
                </div>
                <input onClick={handleSubmit} type="button" value="Create list" />
            </form>
            <input onClick={handleAddRows} type="button" value="Add rows" />
        </div >
    )
})

export default NewList
