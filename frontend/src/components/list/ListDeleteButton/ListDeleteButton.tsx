import { useToggle } from "hooks/useToggle";

const ListDeleteButton = ({ handleDelete }) => {
    const [confirming, toggleConfirming] = useToggle(false);

    return (
        <span className="ListDeleteButton">
            {!confirming ?
                <input
                    onClick={toggleConfirming}
                    type="button"
                    value="Delete list"
                /> :
                <>
                    <input
                        onClick={handleDelete}
                        type="button"
                        value="Delete"
                    />
                    <input
                        onClick={toggleConfirming}
                        type="button"
                        value="Keep"
                    />
                </>
            }
        </span>
    )
};

export default ListDeleteButton