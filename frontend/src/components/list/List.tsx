import { memo } from "react";
import './style/List.scss';
import useList from 'hooks/useList';
import ListTerms from './ListTerms';
import ListTitleBar from './ListTitleBar';
import ListReviewButtons from "./ListReviewButtons";

const List = memo((props) => {
    const {
        list,
        termsToDisplay,
        filter,
        handleListTitleBlur,
        handleDelete,
        setFilter
    } = useList();

    return (
        <>
            <div className="PageWrapper">
                <div className="List">
                    {list &&
                        <>
                            <ListTitleBar {...{ handleListTitleBlur, list, handleDelete }} />
                            <ListReviewButtons />
                            <ListTerms {...{ filter, setFilter, termsToDisplay, list }} />
                        </>
                    }
                </div>
            </div>
        </>
    )
});

export default List