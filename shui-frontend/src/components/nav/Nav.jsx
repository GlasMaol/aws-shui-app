import React from 'react';
import { Link } from 'react-router-dom';
import deleteImg from '../../assets/delete-message-btn.svg';
import userImg from '../../assets/user-btn.svg';
import editImg from '../../assets/send-message-btn.svg';
import './nav.css';

export default function Nav({ MessageID, UserName }) {
    // Log MessageID and UserName for debugging
    console.log('MessageID:', MessageID);
    console.log('UserName:', UserName);

    return (
        <div className='navComponent'>
            <Link to={`/delete/${MessageID}`} className='btn'>
                <img src={deleteImg} alt='delete message button' />
                <h2 className='h2Red'>Delete Message</h2>
            </Link>
            <Link to={`/user/${UserName}`} className='btn'>
                <img src={userImg} alt='User messages' />
                <h2 className='h2'>User Messages</h2>
            </Link>
            <Link to={`/edit/${MessageID}`} className='btn'>
                <img src={editImg} alt='edit message' />
                <h2 className='h2'>Edit Message</h2>
            </Link>
        </div>
    );
}
