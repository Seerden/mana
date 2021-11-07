import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { useRouteProps } from 'hooks/routerHooks';
import NewListTerm from './NewListTerm';
import { NewListTermInput } from 'gql/codegen-output';
import './style/NewList.scss';
import { useMutateCreateList } from 'gql/hooks/list.query';
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
        console.log(formOutput);
    }, [formOutput])

    useEffect(() => {
        isSuccess && navigate(`/u/${params.username}/lists`)
    }, [isSuccess])

    /** Add a keypress listener for tab-key presses. 
     * Add 10 new rows if user presses tab on last input. 
     * Autofocus the first newly added term. */
    const tabListener = (e: KeyboardEvent) => {
        if (!e.shiftKey && e.key === "Tab" && focussedInput?.index === termInputs.length - 1 && focussedInput.side === 'to') {
            e.preventDefault();
            setNumTerms(cur => cur + 10);
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
                    autoFocus={i === focussedInput?.index! + 1}
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
        const { name, value } = e.currentTarget;
        if (value !== formOutput[name]) {
            if (Array.isArray(formOutput[name])) {
                setFormOutput({
                    ...formOutput,
                    [e.currentTarget.name]: [...formOutput[e.currentTarget.name], e.currentTarget.value]
                })
            } else {
                setFormOutput({ ...formOutput, [e.currentTarget.name]: e.currentTarget.value });
            }
        }
    }

    const handleSubmit = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (["name", "from", "to", "owner"].every(entry => {
            return formOutput.hasOwnProperty(entry) && (typeof formOutput[entry] == 'string' || Array.isArray(formOutput[entry]))
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
                    <div className="NewList__form--name">

                    </div>
                    <label className="NewList__form--name-label">
                        List name
                    </label>
                    <input
                        className="NewList__form--name-input"
                        onBlur={handleBlur}
                        type="text"
                        name="name"
                        placeholder="week 3 vocabulary"
                    />

                    <div className="NewList__form--languages">
                        <div className="NewList__form--languages-language">
                            <label
                                htmlFor="from"
                                className="NewList__form--languages-language-label"
                            >Original language</label>
                            <input
                                className="NewList__form--languages-language-input"
                                onBlur={handleBlur}
                                type="text"
                                name="from"
                                placeholder="Klingon"
                            />
                        </div>
                        <BiArrowToRight className="NewList__form--languages-icon" />

                        <div className="NewList__form--languages-language">
                            <label
                                htmlFor="to"
                                className="NewList__form--languages-language-label"
                            >Target language</label>
                            <input
                                className="NewList__form--languages-language-input"
                                onBlur={handleBlur}
                                type="text"
                                name="to"
                                placeholder="Elvish"
                            />
                        </div>
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
