import React, { memo } from "react";
import './style/List.scss';
import useList from './useList';

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
                    {list &&
                        <>
                            <ListTitleBar {...{ handleListTitleBlur, list, handleDelete }} />
                            <ListTerms {...{ filter, setFilter, termsToDisplay, list }} />
                        </>
                    }
                </div>
            </div>
        </>
    )
})

export default List