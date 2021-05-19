import React, { useState, useEffect, memo, useCallback } from 'react';
import { useRouteProps } from 'hooks/routerHooks';
import NewListTerm from './NewListTerm';
import { NewListTermInput } from 'graphql/codegen-output';
import './style/NewList.scss';
import { useMutateCreateList } from 'graphql/queries/list.query';

export type FormOutput = {
    owner?: string
    name?: string,
    from?: string,
    to?: string,
    terms?: NewListTermInput[],
}

const NewList = memo((props) => {
    const { params } = useRouteProps();
    const [numTerms, setNumTerms] = useState<number>(10)
    const [formOutput, setFormOutput] = useState<FormOutput>(() => ({
        owner: params.username,
        terms: new Array(numTerms),
    }))
    const [termInputs, setTermInputs] = useState<JSX.Element[]>([] as JSX.Element[]);
    const { mutate: mutateCreateList } = useMutateCreateList();

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

    const handleSubmit = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (["name", "from", "to", "owner"].every(entry => {
            return formOutput.hasOwnProperty(entry) && typeof formOutput[entry] == 'string'
        })) {
            const terms = formOutput.terms?.filter(term => term !== null);

            if (terms && terms.length > 0) {
                // @ts-ignore - because of how we check for the existence of keys above, TS doesn't know they exist
                mutateCreateList({
                    ...formOutput,
                    terms
                })
            }
        }
    }, [formOutput, setFormOutput])

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
