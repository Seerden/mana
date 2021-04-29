import React, { memo, useMemo, useState, useEffect, Key } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from 'hooks/routerHooks';
import SaturationFilter from 'components/SaturationFilter/SaturationFilter';
import ListDeleteButton from './ListDeleteButton';
import './style/List.scss';
import ListSaturationState from "./ListSaturationState";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import useList from './useList';

const List = memo((props) => {
    const { location } = useRouteProps();

    const [
        list, 
        terms, 
        termsToDisplay, 
        suggestedTermsForReview, 
        selectingTerms, 
        numTermsToReview, 
        filter,
        deleteResponse,
        handleListTitleBlur,
        handleDelete,
        updateTermsToReview,
        setSelectingTerms,
        setFilter
    ] = useList();

    return (
        <>
            <div className="PageWrapper">
                <div className="List">
                    {deleteResponse && JSON.stringify(deleteResponse)}

                    {list &&

                        <>
                            <h1 className="PageHeader">

                                <section className="List__titlebar">
                                    <div>
                                        <span
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={handleListTitleBlur}
                                            className="List__section--header"
                                        >
                                            {list.name}
                                        </span>
                                        <span> ({list.from} to {list.to})</span>
                                    </div>

                                    {/* ---- LIST DELETE BUTTON ---- */}
                                    <div>
                                        <ListDeleteButton {...{ handleDelete }} />
                                    </div>
                                </section>
                            </h1>

                            <section className="List__meta">
                                {/* ---- SATURATION TABLE ---- */}
                                {terms &&
                                    <section className="List__section">
                                        <header className="List__section--header">
                                            <span className="List__section--heading">Progress</span>
                                        </header>
                                        {terms && <ListSaturationState terms={terms} />}

                                        {suggestedTermsForReview && (suggestedTermsForReview.forwards.length > 0 || suggestedTermsForReview.backwards.length > 0)
                                            ?
                                            <div>
                                                <h4 className="List__section--header" style={{ backgroundColor: 'orangered', marginTop: '0.5rem' }}>Due for review:</h4>
                                                <div>
                                                    <BiArrowToRight /> {suggestedTermsForReview.forwards.length} terms due.
                                                    <button
                                                        className="List__review--button"
                                                        onClick={() => updateTermsToReview({ type: 'overdue', direction: 'forwards' })}
                                                    >Select for review.</button>
                                                </div>
                                                <div>
                                                    <BiArrowToLeft /> {suggestedTermsForReview.backwards.length} terms due.
                                                    <button
                                                        className="List__review--button"
                                                        onClick={() => updateTermsToReview({ type: 'overdue', direction: 'backwards' })}
                                                    >Select for review.</button>
                                                </div>
                                            </div>
                                            :
                                            <div className="List__section--header" style={{ color: 'black', backgroundColor: 'deepskyblue', marginTop: '0.5rem' }}>
                                                No terms due for review yet.
                                            </div>
                                        }
                                    </section>
                                }

                                {/* ---- REVIEW SELECTION SECTION ---- */}
                                <section className="List__section">
                                    <header className="List__section--header">Review</header>

                                    <div className="List__section">
                                        <header className="List__section--header">All</header>
                                        <Link className="List__review--button" to={`${location.pathname}/review?kind=full`}>Review all terms</Link>
                                    </div>

                                    <div className="List__section">
                                        <h4 className="List__section--header">Selective</h4>
                                        {numTermsToReview > 0 &&
                                            <Link style={{ marginBottom: '0.4rem' }} className="List__review--button" to={`${location.pathname}/review?kind=partial`}>Review {numTermsToReview} selected terms</Link>
                                        }
                                        <div>
                                            <button onClick={() => setSelectingTerms(cur => !cur)} className="List__review--button">select manually {selectingTerms ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</button>
                                        </div>
                                        <div>
                                            <button onClick={() => updateTermsToReview({ type: 'all' })} className="List__review--button">select all</button>
                                            <button onClick={() => updateTermsToReview({ type: 'visible' })} className="List__review--button">select visible</button>
                                            <button onClick={() => updateTermsToReview({ type: 'none' })} className="List__review--button">select none</button>
                                        </div>
                                    </div>
                                </section>
                            </section>

                            <ul className="List__terms">
                                <div className="List__terms--header">
                                    <header className="List__section--header">
                                        Terms
                                    </header>

                                    <div className="List__terms--saturationfilter">
                                        {filter.saturation.level
                                            ?
                                            <span className="List__terms--saturationfilter--display">
                                                Showing filtered list.
                                            </span>
                                            :
                                            <span className="List__terms--saturationfilter--display">
                                                Showing all terms.
                                            </span>
                                        }

                                        {list && list.sessions && list.sessions?.length > 0 &&
                                            <SaturationFilter
                                                filter={filter}
                                                setFilter={setFilter}
                                            />
                                        }
                                    </div>
                                </div>

                                {termsToDisplay ? termsToDisplay : <div>Loading terms..</div>}
                            </ul>
                        </>
                    }
                </div>
            </div>
        </>
    )
})

export default List