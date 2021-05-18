import React, { useState, useEffect, memo } from 'react';
import { useRouteProps } from 'hooks/routerHooks';
import { postList, handlePostList } from 'helpers/apiHandlers/listHandlers';
import { useRequest } from 'hooks/useRequest';
import NewListTerm from './NewListTerm';
import { Term } from 'graphql/codegen-output';
import './style/NewList.scss';

export type FormOutput = {
    name: string,
    from: string,
    to: string,
    terms: Partial<Term>[],
    created?: Date;
}

const NewList = memo((props) => {
    const { params } = useRouteProps();
    const [numTerms, setNumTerms] = useState<number>(10)
    const [formOutput, setFormOutput] = useState<FormOutput>(() => ({
        name: "",
        from: "",
        to: "",
        terms: new Array(numTerms),
        created: undefined,
    }))
    const [termInputs, setTermInputs] = useState<JSX.Element[]>([] as JSX.Element[]);

    const { response: postResponse, setRequest: setPostRequest } = useRequest({ ...handlePostList() });

    useEffect(() => {
        setTermInputs(makeTermInputElements(formOutput, numTerms))
    }, [formOutput, numTerms])

    function makeTermInputElements(formOutput: FormOutput, numTerms: number) {
        const termElements: JSX.Element[] = [];

        for (let i = 0; i < numTerms; i++) {
            termElements.push(
                <NewListTerm 
                    key={`term-${i + 1}`} 
                    index={i} 
                    formOutput={formOutput}   // @todo: formOutput should be recoil atom. Passing the state through props like this for any number of terms might lead to stale closures
                    setFormOutput={setFormOutput} />
            )
        }
        return termElements
    }

    function handleAddRows(e) {
        setNumTerms(numTerms + 10);
    };


    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        if (e.currentTarget.value !== formOutput[e.currentTarget.name]) {
            setFormOutput({ ...formOutput, [e.currentTarget.name]: e.currentTarget.value });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        setPostRequest(() => postList(params.username, {
            owner: params.username,
            ...formOutput,
            created: new Date(),
            terms: formOutput.terms.filter(i => i !== null),
        }));

    }

    return (
        <div className="NewList">
            <div className="PageHeader">
                New List
            </div>

            {!postResponse
                ?
                <form className="NewList__form">
                    <input className="NewList__form--name" onBlur={handleBlur} type="text" name="name" placeholder="List name" />
                    <input className="NewList__form--language" onBlur={handleBlur} type="text" name="from" placeholder="Original language" />
                    <input className="NewList__form--language" onBlur={handleBlur} type="text" name="to" placeholder="Translated language" />


                    <div className="NewList__terms">
                        <input className="Form__button" onClick={handleAddRows} type="button" value="Add rows" />

                        {termInputs.length > 0 &&
                            <>
                                <div className="NewList__terms--header">
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

                :
                <>
                    {JSON.stringify(postResponse)}
                </>

            }


        </div>
    )
})

export default NewList
