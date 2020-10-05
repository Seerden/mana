import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import csvData from './testcsv.csv';
import './css/csv.css'

const CSV = () => {
    const [data, setData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // currently loading local data for testing. eventually lines 2, 3 and the d3.dsv will be replaced by a database call
        d3.dsv(',', csvData, d => ({ JA: d.JA, EN: d.EN })
        )
            .then(data => setData(data))

    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        let newIndex;
        currentIndex == data.length-1 ? newIndex = 0 : newIndex = currentIndex + 1
        setCurrentIndex(newIndex)
        }

    return (
        <div className="Wrapper">

            { data &&
                <div className="item">
                    <div>{
                        Object.keys(data[currentIndex]).map(i =>
                        <span className="item-span">{data[currentIndex][i]}</span>
                        )
                        }
                    </div>
                        <input type="button" onClick={handleClick} value="Next term" />
                </div>
            }

            {/* display a list of items in data */}
            {/* {data && 
                <ul>
                    { data.map(d => 
                    <li className="data-item">
                        <span className="data-JA">{d.JA}</span> 
                        <span className="data-EN">{d.EN}</span></li>
                    ) }
                </ul>
            } */}
        </div>
    )
}

export default CSV;