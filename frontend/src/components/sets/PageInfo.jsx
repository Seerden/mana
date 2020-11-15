import React, { useState } from "react";
import { useToggle } from 'hooks/useToggle';
import { AiFillInfoCircle } from 'react-icons/ai'
import './style/PageInfo.scss'

const PageInfo = ({ children }) => {
    const [isOpen, toggleOpen] = useToggle(false);

    return (
        <div className="PageInfo">
            <div className="PageInfo__wrapper">
                <div 
                    className="PageInfo__button"
                    style={{color: isOpen ? 'deepskyblue' : 'white'}}
                >
                    { !isOpen
                        ?
                        <AiFillInfoCircle
                            size={25}
                            fill="deepskyblue"
                            onClick={toggleOpen}
                        />
                        :
                        <button 
                            className="PageInfo__close"
                            onClick={toggleOpen}
                        >
                            x
                        </button>

                    }
                </div>

                {isOpen &&
                    <div className="PageInfo__info">
                        {children}

                    </div>
                }

            </div>
        </div>
    )

}

export default PageInfo