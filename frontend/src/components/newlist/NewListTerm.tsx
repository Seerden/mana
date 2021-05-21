import React, { memo, useCallback } from 'react';
import { FormOutput } from './NewList';
import './style/NewList.scss'

type NewListTermProps = {
    index: number,
    formOutput: FormOutput,
    setFormOutput: React.Dispatch<React.SetStateAction<FormOutput>>,
    focusIndex?: number,
    setFocusIndex: React.Dispatch<React.SetStateAction<number>>
}

const NewListTerm = memo(({ index, formOutput, setFormOutput, setFocusIndex, focusIndex }: NewListTermProps) => {
    function handleTermBlur(e: React.FocusEvent<HTMLInputElement>, idx: number) {
        setFocusIndex(-1)

        let copy = { ...formOutput };
        // @ts-ignore
        if (!copy.terms[idx] && e.target.value) {
            // @ts-ignore
            copy.terms[idx] = { to: "", from: "" };
        }
        // @ts-ignore
        if (e.target.value && e.target.value !== copy.terms[idx][e.target.name]) {
            // @ts-ignore
            copy.terms[idx][e.target.name] = e.target.value;
            setFormOutput({ ...formOutput, terms: copy.terms });
        }
    }
    const isFocussed = focusIndex === index;

    const handleFocus = () => {
        setFocusIndex(index);
    };

    return (
        <div className="NewList__term">
            <div 
                className="NewList__term--index"
                style={{ 
                    backgroundColor: isFocussed ? 'deepskyblue' : '#111',
                    color: isFocussed ? 'black' : 'azure'
                }}
            >
                {index+1}
            </div>

            <div className="NewList__term--inputs">
                <input 
                    className="NewList__term--input" 
                    onFocus={handleFocus}
                    onBlur={(e) => handleTermBlur(e, index)} 
                    type="text" 
                    name="from" 
                />
                <input 
                    onFocus={handleFocus}
                    className="NewList__term--input" 
                    onBlur={(e) => handleTermBlur(e, index)} 
                    type="text" 
                    name="to" 
                />
            </div>
        </div>
    )
});

export default NewListTerm;