import React from 'react'

const ListsByUser = ({history, location, match}) => {
    const username = match.params.username;
    return (
        <div className="ListsByUser">
            Lists by {username}
        </div>
    )
}

export default ListsByUser;