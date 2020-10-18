import React, { memo } from 'react'
import './css/LanguageInput.css'

const LanguageInput = memo(({ formOutput, setFormOutput }) => {
    // const languages = ['English', 'Japanese', 'Dutch', 'German', 'Italian', 'Spanish'];  // @TODO: part of autocomplete feature

    const handleBlur = e => {
        e.preventDefault();
        const t = e.currentTarget;

        if (t.value) {
            if (t.value && formOutput.languages[t.name] !== t.value) {
                setFormOutput({ ...formOutput, languages: { ...formOutput.languages, [t.name]: t.value } })
            }
        }
    }

    return (
        <div className="LanguageInput__wrapper">
            <div className="LanguageInput__header">Languages</div>
            <div className="LanguageInput">
                <div className="LanguageInput__side">
                    <label htmlFor="from">Main</label>
                    <input onBlur={handleBlur} type="text" name="from" />
                </div>
                <div className="LanguageInput__side">
                    <label htmlFor="to">Secondary</label>
                    <input onBlur={handleBlur} type="text" name="to" />
                </div>
            </div>


        </div>
    )
})

export default LanguageInput;