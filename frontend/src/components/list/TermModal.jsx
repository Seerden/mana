import React, { useEffect } from "react";

import TermHistory from './TermHistory';
import './style/TermModal.scss';

const TermModal = ({ handleConfirmClick, setOpen, term, handleTermEdit, confirmingDelete, setConfirmingDelete }) => {
    const closeModal = e => {
        if (e.currentTarget === e.target) {
            setOpen(false)
        }
    }

    const handleKeydown = (e) => {
        if (e.code === "Escape") {
            setOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown)
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [])

    const inputStyle = {
        backgroundColor: confirmingDelete ? 'orangered' : '',
        boxShadow: !confirmingDelete ? '' : '0 0 1rem black',
        border: confirmingDelete ? '2px solid black' : ''
    }

    return (
        <>
            <div onClick={closeModal} className="TermModal__wrapper"></div>
                <div className="TermModal">
                    <section>
                        <div className="TermModal__header">
                            <header>Term details</header>
                            <button title="Close modal" onClick={() => setOpen(false)}>x</button>
                        </div>

                        <label htmlFor="front">Front:</label>
                        <input
                            tabIndex="1"
                            name="front"
                            disabled={confirmingDelete}
                            title="Click to edit"
                            style={inputStyle}
                            className="TermModal__input"
                            onBlur={handleTermEdit} className="" side="from" type="text" defaultValue={term.from} 
                        />

                        <label htmlFor="back">Back:</label>
                        <input
                            name="back"
                            tabIndex="2"
                            disabled={confirmingDelete}
                            title="Click to edit"
                            style={inputStyle}
                            className="TermModal__input"
                            onBlur={handleTermEdit} className="" side="to" type="text" defaultValue={term.to} 
                        />
                    </section>

                    <section>
                        <header> History </header>
                        <TermHistory history={term.history} />
                    </section>

                    <div className="TermModal__delete--wrapper">
                    { !confirmingDelete
                        ?
                        <button onClick={() => setConfirmingDelete(true)} className="TermModal__delete">Delete this term</button>

                        :
                        <>
                            <div className="TermModal__delete--confirm">Delete?</div>
                            <button onClick={(e) => handleConfirmClick(e, {type: 'delete'})} className="TermModal__delete--confirm-yes">Yes</button>
                            <button onClick={() => setConfirmingDelete(false)} className="TermModal__delete--confirm-no">No</button>
                        </>

                    }
                    </div>
                </div>

        </>
    )
}

export default TermModal

/* structure:
    front (input)
    back(input)

    history
    delete button


*/