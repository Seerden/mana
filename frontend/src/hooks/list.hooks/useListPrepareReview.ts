import { List } from "gql/codegen-output";
import { Maybe } from "graphql/jsutils/Maybe";
import { filterTermsBySaturation } from "helpers/filterTermsBySaturation";
import { suggestTermsForReview } from "helpers/srs/saturation";
import { useCallback, useMemo } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { selectingTermsToReviewState } from "state/atoms/listAtoms";
import { termsToReviewState } from "state/atoms/reviewAtoms";
import { FilterInterface } from "types/list.types";

type Args = {
    list: Maybe<List>;
    filter: FilterInterface,
    truncatedTerms: any[];
};

export function useListPrepareReview({
    list,
    filter,
    truncatedTerms,
}: Args) {
    const setTermsToReview = useSetRecoilState(termsToReviewState);
    const resetTermsToReview = useResetRecoilState(termsToReviewState);

    const [selectingTerms, setSelectingTerms] = useRecoilState(
        selectingTermsToReviewState
    );

    const suggestedTermsForReview = useMemo(
        () => list && suggestTermsForReview(list.terms),
        [list]
    );

    const updateTermsToReview = useCallback(
        ({
            type,
            direction,
        }: {
            type: "all" | "visible" | "none" | "overdue";
            direction: Direction;
        }) => {
            if (list && list.terms) {
                switch (type) {
                    case "all":
                        // @ts-ignore
                        setTermsToReview(list.terms);
                        break;
                    case "visible": // add all visible terms to termsToReview, as long as they're not already in there
                        setTermsToReview((cur) =>
                            Array.from(
                                new Set([
                                    ...cur,
                                    ...filterTermsBySaturation(filter, truncatedTerms).map(
                                        (t) => t.term
                                    ),
                                ])
                            )
                        );
                        break;
                    case "none":
                        resetTermsToReview();
                        break;
                    case "overdue":
                        if (suggestedTermsForReview) {
                            setTermsToReview(suggestedTermsForReview[direction]);
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        [list, setTermsToReview, suggestedTermsForReview]
    );

    return {
        selectingTerms,
        setSelectingTerms,
        suggestedTermsForReview,
        updateTermsToReview,
    } as const;
}
