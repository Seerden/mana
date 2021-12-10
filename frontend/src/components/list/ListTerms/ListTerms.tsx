import SaturationFilter from "components/SaturationFilter/SaturationFilter";
import "./Terms.scss";

const ListTerms = ({ filter, setFilter, termsToDisplay, list }) => {
    const showingString = filter.saturation.level
        ? "Showing filtered list"
        : "Showing all terms";

    return (
        <section className="Terms">
            <ul className="List__terms">
                <div>
                    <header className="Terms__header">Terms</header>

                    <div className="Terms__filterinfo">
                        {list && list.sessions?.length > 0 && (
                            <SaturationFilter {...{ filter, setFilter }} />
                        )}
                        <span className="Terms__filterinfo--filterstring">
                            {showingString}
                        </span>
                    </div>
                </div>

                {termsToDisplay ? (
                    termsToDisplay.length > 0 ? (
                        termsToDisplay
                    ) : (
                        <div className="Terms__display--filtered">
                            All terms were filtered out
                        </div>
                    )
                ) : (
                    <div>Loading terms..</div>
                )}
            </ul>
        </section>
    );
};

export default ListTerms;
