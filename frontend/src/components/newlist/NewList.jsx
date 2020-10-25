import React, { useState, useEffect, memo } from 'react';
import { useRouteProps } from '../../hooks/routerHooks';
import axios from 'axios';
import { useLogState } from '../../hooks/state'
import './css/NewList.css';
import NewListTerm from './NewListTerm';

const NewList = memo((props) => {
    const { params } = useRouteProps();
    const [numTerms, setNumTerms] = useState(10)  // @TODO: allow user to set default number of terms when making new list
    const [formOutput, setFormOutput] = useState(() => ({
        name: "",
        from: "",
        to: "",
        content: new Array(numTerms),
        created: null,
        numTerms: 0,
    }))
    const [termInputs, setTermInputs] = useState([]);

    useLogState('formOutput', formOutput)

    useEffect(() => {
        setTermInputs(makeTermInputElements(formOutput, numTerms))
    }, [formOutput, numTerms])

    function makeTermInputElements(formOutput, numTerms) {
        let termElements = []
        for (let i = 0; i < numTerms; i++) {
            termElements.push(
                <NewListTerm key={`term-${i + 1}`} index={i} formOutput={formOutput} setFormOutput={setFormOutput} />
            )
        }
        return termElements
    }

    const handleAddRows = e => {
        setNumTerms(numTerms + 10);
    }


    const handleBlur = e => {;
        if (e.currentTarget.value !== formOutput[e.currentTarget.name]) {
            setFormOutput({ ...formOutput, [e.currentTarget.name]: e.currentTarget.value })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/db/list', {
            newList: {
                owner: params.username, // @TODO: replace
                ...formOutput,
                content: formOutput.content.filter(i => i !== null)
            }
        })
    }

    return (
        <div className="NewList">
            <div className="PageHeader">
                New List
            </div>

            <form className="NewList__form">
                <input className="NewList__form--name" onBlur={handleBlur} type="text" name="name" placeholder="List name" />
                <input className="NewList__form--language" onBlur={handleBlur} type="text" name="from" placeholder="Original language" />
                <input className="NewList__form--language" onBlur={handleBlur} type="text" name="to" placeholder="Translated language" />


                <div className="NewList__terms">
                    <input className="Form__button" onClick={handleAddRows} type="button" value="Add rows" />

                    {termInputs.length > 0 &&
                        <>
                            <div className="NewList__terms--header">
                                <span></span>
                                {formOutput &&
                                    <>
                                        <span className="Terms__header--side">{formOutput.from}</span>
                                        <span className="Terms__header--side">{formOutput.to}</span>
                                    </>
                                }
                            </div>
                            {termInputs}
                        </>
                    }
                </div>

                <input className="Form__button" onClick={handleSubmit} type="button" value="Create list" />
            </form>

        </div>
    )
})

export default NewList
