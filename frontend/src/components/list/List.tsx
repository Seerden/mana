import React, { memo } from "react";
import { Link } from 'react-router-dom';
import { useRouteProps } from 'hooks/routerHooks';
import SaturationFilter from 'components/SaturationFilter/SaturationFilter';
import ListDeleteButton from './ListDeleteButton';
import './style/List.scss';
import ListSaturationState from "./ListSaturationState";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import useList from './useList';
import ListMeta from "./ListMeta/ListMeta";

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

                            <ListMeta {...{ terms, suggestedTermsForReview, updateTermsToReview, numTermsToReview, setSelectingTerms, selectingTerms }}/>

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