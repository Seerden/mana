import React, { useState, useEffect } from "react";
import axios from 'axios';

const List = ({ match, history, location}) => {
    const [list, setList] = useState(null)
    useEffect(() => {
        axios.get(`/db/listbyid/${match.params.id}`).then(r => setList(r.data))
    }, [])

    return (
        <div className="List">

            { list ? JSON.stringify(list) : 'Loading list...'}
        </div>
    )
}

export default List