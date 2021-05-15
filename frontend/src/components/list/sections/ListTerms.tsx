import React from "react";
import SaturationFilter from 'components/SaturationFilter/SaturationFilter';

const ListTerms = ({ filter, setFilter, termsToDisplay, list }) => {
    return (
        <ul className="List__terms">
            <div className="List__terms--header">
                <header className="List__section--header">
                    Terms
                </header>

                <div className="List__terms--saturationfilter">
                    {filter.saturation.level
                        ?   <span className="List__terms--saturationfilter--display">
                                Showing filtered list.
                            </span>
                        :   <span className="List__terms--saturationfilter--display">
                                Showing all terms.
                            </span>
                    }

                    {list && list.sessions && list.sessions?.length > 0 &&
                        <SaturationFilter {... { filter, setFilter }} />
                    }
                </div>
            </div>

            {termsToDisplay ? termsToDisplay : <div>Loading terms..</div>}
        </ul>
    )
}

export default ListTerms