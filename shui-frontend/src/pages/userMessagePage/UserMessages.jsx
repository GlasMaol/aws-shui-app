import React from 'react'
import { useParams } from 'react-router-dom';

function UserMessages() {

    const { userName } = useParams();

    return (
        <h1>
            User Messages page #{ userName }
        </h1>
    )
}

export default UserMessages
