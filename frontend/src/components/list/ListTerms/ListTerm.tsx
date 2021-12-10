import SaturationIcon from "components/SaturationFilter/SaturationIcon";
import { memo, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { TermPropsInterface } from "types/list.types";
import TermModal from "../TermModal/TermModal";
import "./ListTerm.scss";
import { useListTerm } from "./useListTerm";

const ListTerm = memo(
    ({ handleTermDelete, term: termFromProps, idx }: TermPropsInterface) => {
        const [term, setTerm] = useState<typeof termFromProps>(() => termFromProps);
        const {
            open,
            setOpen,
            selectingTerms,
            selected,
            handleSelect,
            handleConfirmClick,
            handleTermEdit,
            confirmingDelete,
            setConfirmingDelete,
        } = useListTerm({ term, handleTermDelete, idx, setTerm });

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
                        {...{
                            handleConfirmClick,
                            setOpen,
                            term,
                            handleTermEdit,
                            confirmingDelete,
                            setConfirmingDelete,
                        }}
                    />
                )}
            </div>
        );
    }
);

export default ListTerm;

/* FIXME: deleting only term in a list doesn't update visible terms (but does update the database entry, so problem lies in a key or a render based on .length > 0) */
