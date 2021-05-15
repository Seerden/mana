import React, { memo } from "react";
import './style/List.scss';
import useList from './useList';

import ListMeta from "./sections/ListMeta/ListMeta";
import ListTerms from './sections/ListTerms';
import ListTitleBar from './sections/ListTitleBar';

const List = memo((props) => {
    const {
        list,
        truncatedTerms: terms,
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
    } = useList();

    return (
        <>
            <div className="PageWrapper">
                <div className="List">
                    {deleteResponse && JSON.stringify(deleteResponse)}
                    {list &&
                        <>
                            <ListTitleBar {...{ handleListTitleBlur, list, handleDelete }} />
                            <ListMeta {...{ terms, suggestedTermsForReview, updateTermsToReview, numTermsToReview, setSelectingTerms, selectingTerms }} />
                            <ListTerms {...{ filter, setFilter, termsToDisplay, list }} />
                        </>
                    }
                </div>
            </div>
        </>
    )
})

export default List