import React, { useEffect } from "react";

import TermHistory from './TermHistory';
import './style/TermModal.scss';

const TermModal = ({ setOpen, term, handleTermEdit, confirmingDelete }) => {
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
                            name="front"
                            disabled={confirmingDelete}
                            title="Click to edit"
                            style={{
                                backgroundColor: confirmingDelete ? 'orangered' : '',
                            }}
                            className="TermModal__input"
                            onBlur={handleTermEdit} className="" side="from" type="text" defaultValue={term.from} />

                        <label htmlFor="back">Back:</label>
                        <input
                            name="back"
                            disabled={confirmingDelete}
                            title="Click to edit"
                            style={{
                                backgroundColor: confirmingDelete ? 'orangered' : '',
                            }}
                            className="TermModal__input"
                            onBlur={handleTermEdit} className="" side="to" type="text" defaultValue={term.to} />
                    </section>

                    <section>
                        <header> History </header>
                        <TermHistory history={term.history} />
                    </section>

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