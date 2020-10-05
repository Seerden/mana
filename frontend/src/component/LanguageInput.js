import React, { memo } from 'react'
import './css/LanguageInput.component.css'

const LanguageInput = memo(({ formOutput, setFormOutput }) => {
    // const languages = ['English', 'Japanese', 'Dutch', 'German', 'Italian', 'Spanish'];  // @TODO: part of autocomplete feature

    const handleBlur = e => {
        e.preventDefault();
        const t = e.currentTarget;

        if ( t.value ) {
            if ( t.value && formOutput.languages[t.name] !== t.value ) {
                setFormOutput({...formOutput, languages: {...formOutput.languages, [t.name]: t.value}})
            }
        }
    }

    return (
        <div className="LanguageInput">
           
            <div className="Language__From-wrapper">
                <label htmlFor="from">From:</label>
                <input onBlur={handleBlur} type="text" name="from" />
            </div>
            <div className="Language__To-wrapper">
                <label htmlFor="to">To:</label>
                <input onBlur={handleBlur} type="text" name="to" />
            </div>

            
        </div>
    )
})

export default LanguageInput;