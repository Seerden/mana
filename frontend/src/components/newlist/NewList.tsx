import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { useRouteProps } from 'hooks/routerHooks';
import NewListTerm from './NewListTerm';
import { NewListTermInput } from 'graphql/codegen-output';
import './style/NewList.scss';
import { useMutateCreateList } from 'graphql/queries/list.query';
import { BiArrowToRight } from 'react-icons/bi';

export type FormOutput = {
    owner?: string
    name?: string,
    from?: string,
    to?: string,
    terms?: NewListTermInput[],
}

export type FocusIndex = {
    index: number,
    side?: 'from' | 'to'
}

const NewList = memo((props) => {
    const { params, navigate } = useRouteProps();
    const [numTerms, setNumTerms] = useState<number>(10)
    const [formOutput, setFormOutput] = useState<FormOutput>(() => ({
        owner: params.username,
        terms: new Array(numTerms),
    }))
    const [termInputs, setTermInputs] = useState<JSX.Element[]>([] as JSX.Element[]);
    const { mutate: mutateCreateList, isSuccess } = useMutateCreateList();
    const [focussedInput, setFocussedInput] = useState<FocusIndex>();

    useEffect(() => {
        setTermInputs(makeTermInputElements(formOutput, numTerms))
    }, [formOutput, numTerms, focussedInput, setFocussedInput])

    useEffect(() => {
        isSuccess && navigate(`/u/${params.username}/lists`)
    }, [isSuccess])

    const tabListener = (e: KeyboardEvent) => {
        if (!e.shiftKey && e.key === "Tab" && focussedInput?.index === termInputs.length-1 && focussedInput.side === 'to') {
            e.preventDefault();
            setNumTerms(cur => cur+10);
            setFocussedInput(cur => ({ index: cur!.index, side: 'from' }));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', tabListener)

        return () => {
            window.removeEventListener("keydown", tabListener)
        }
    }, [numTerms, focussedInput])

    const makeTermInputElements = useCallback((formOutput: FormOutput, numTerms: number) => {
        const termElements: JSX.Element[] = [];

        for (let i = 0; i < numTerms; i++) {
            termElements.push(
                <NewListTerm
                    key={`term-${i + 1}`}
                    index={i}
                    autoFocus={i === focussedInput?.index!+1}
                    focussedInput={focussedInput}
                    setFocussedInput={setFocussedInput}
                    formOutput={formOutput}   // @todo: formOutput should be recoil atom. Passing the state through props like this for any number of terms might lead to stale closures
                    setFormOutput={setFormOutput} 
                />
            )
        };

        return termElements
    }, [formOutput, focussedInput, setFocussedInput])

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

                <section className="NewList__form--header">
                    <input
                        className="NewList__form--name"
                        onBlur={handleBlur}
                        type="text"
                        name="name"
                        placeholder="List name"
                    />

                    <div className="NewList__form--languages">
                        <input
                            className="NewList__form--languages-language"
                            onBlur={handleBlur}
                            type="text"
                            name="from"
                            placeholder="Original language"
                        />
                        <BiArrowToRight className="NewList__form--languages-icon" />
                        <input
                            className="NewList__form--languages-language"
                            onBlur={handleBlur}
                            type="text"
                            name="to"
                            placeholder="Translated language"
                        />
                    </div>
                </section>



                <section className="NewList__form--buttons">
                    <input className="NewList__form--button" onClick={handleAddRows} type="button" value="Add rows" />
                    <input className="NewList__form--button" onClick={handleSubmit} type="button" value="Create list" />
                </section>

                <section className="NewList__terms">

                    {termInputs.length > 0 &&
                        <>
                            <div className="NewList__terms--header">
                                {formOutput &&
                                    <>
                                        <span className="NewList__terms--header-side">{formOutput.from}</span>
                                        <span className="NewList__terms--header-side">{formOutput.to}</span>
                                    </>
                                }
                            </div>
                            {termInputs}
                        </>
                    }
                </section>

            </form>
        </div>
    )
})

export default NewList
