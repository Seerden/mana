import React, { memo, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { selectingTermsToReviewState, listState } from "state/atoms/listAtoms";
import { termsToReviewState } from "state/atoms/reviewAtoms";
import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import { useMutateEditTerm } from "gql/hooks/term.query";
import "./ListTerm.scss";
import { TermPropsInterface } from "types/list.types";
import TermModal from "../TermModal/TermModal";

const ListTerm = memo(
    ({ handleTermDelete, term: termFromProps, idx }: TermPropsInterface) => {
        const [term, setTerm] = useState<any>(() => termFromProps); // @todo: fix any type to be combination of TermInterface and TermElementInterface, after figuring out why I'm using two Term(*?)Interface types
        const [confirmingDelete, setConfirmingDelete] = useState(false);
        const [open, setOpen] = useState<boolean>(false);

        const [listAtom, setListAtom] = useRecoilState(listState);
        const selectingTerms = useRecoilValue(selectingTermsToReviewState);
        const [termsToReview, setTermsToReview] = useRecoilState(termsToReviewState);
        let indexOfTermInTermsToReview = termsToReview.findIndex(
            (t) => t._id === term._id
        );
        const [selected, setSelected] = useState(indexOfTermInTermsToReview > -1);

        // this should probably be passed as prop, otherwise we're initializing the hook from every single term which isn't necessary,
        // since we call the mutation with the term's ID, which we can set as argument in mutate()
        const { mutate: mutateEditTerm } = useMutateEditTerm();

        useEffect(() => {
            // might be superfluous
            indexOfTermInTermsToReview = termsToReview.findIndex(
                (t) => t._id === term._id
            );
            setSelected(indexOfTermInTermsToReview > -1);
        }, [termsToReview]);

        useEffect(() => {
            // cleanup
            return () => {
                setConfirmingDelete(false);
            };
        }, []);

        function handleSelect(e) {
            e.stopPropagation();

            if (indexOfTermInTermsToReview > -1) {
                let currentTermsToReview = [...termsToReview];
                currentTermsToReview.splice(indexOfTermInTermsToReview, 1);
                setTermsToReview(currentTermsToReview);
                setSelected(false);
            } else {
                setTermsToReview((current) => [...current, term]);
                setSelected(true);
            }
        }

        /**
         * Remove the term from the list. Triggered on deletion confirmation.
         */
        function handleConfirmClick(e: React.SyntheticEvent, action: { type: "delete" }) {
            e.preventDefault();
            setConfirmingDelete(false);
            setOpen(false);
            if (action.type === "delete") {
                handleTermDelete(idx);
            }
        }

        /**
         * Fire a mutation to edit the term's 'from'/'to' value in the database, and update this value in listAtom
         */
        function handleTermEdit(
            e: React.FocusEvent<HTMLInputElement & { side: "from" | "to" }>
        ) {
            let side = e.currentTarget.getAttribute("side")!;
            if (e.target.value && term[side] !== e.target.value) {
                let newTerm = { ...term, [side]: e.target.value };
                setTerm(newTerm);

                const mutationVariables = {
                    _id: term._id,
                    [side]: e.target.value,
                };

                // fire mutation to edit term in database
                mutateEditTerm(mutationVariables);

                // assume the mutation will be successful, and just edit the term in the list in-place
                let newListContent: any[] = [...listAtom.terms!];
                newListContent[idx] = { ...newListContent[idx], [side]: e.target.value };
                let newList = { ...listAtom, terms: [...newListContent] };
                setListAtom(newList);
            }
        }

        return (
            <div className="ListTerm">
                <li
                    className="Term"
                    title="Click to expand"
                    onClick={() => setOpen(true)}
                >
                    <span className="Term__index">{idx + 1}</span>
                    <span className="Term__from">{term.from}</span>
                    <span className="Term__to">{term.to}</span>
                    <SaturationIcon
                        classes={"Term__saturation"}
                        direction="forwards"
                        saturation={term.saturation?.forwards}
                    />
                    <SaturationIcon
                        classes={"Term__saturation"}
                        direction="backwards"
                        saturation={term.saturation?.backwards}
                    />
                    {selectingTerms ? (
                        <div
                            className="Term__select"
                            style={{
                                color: selected ? "seagreen" : "#555",
                            }}
                            onClick={handleSelect}
                        >
                            {selected ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                        </div>
                    ) : (
                        ""
                    )}
                </li>
                {open && (
                    <TermModal
                        handleConfirmClick={handleConfirmClick}
                        setOpen={setOpen}
                        term={term}
                        handleTermEdit={handleTermEdit}
                        confirmingDelete={confirmingDelete}
                        setConfirmingDelete={setConfirmingDelete}
                    />
                )}
            </div>
        );
    }
);

export default ListTerm;

/* FIXME: deleting only term in a list doesn't update visible terms (but does update the database entry, so problem lies in a key or a render based on .length > 0) */
