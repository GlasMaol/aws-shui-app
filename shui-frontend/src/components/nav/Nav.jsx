


import React from 'react';
import { Link } from 'react-router-dom'
import deleteImg from '../../assets/delete-message-btn.svg';
import userImg from '../../assets/user-btn.svg';
import editImg from '../../assets/send-message-btn.svg';
import './nav.css';

export default function Nav() {
    return (
        <div className='navComponent'>
            <Link to='/delete' className='btn'>
                <img src={deleteImg} alt='delete message button' />
                <h2 className='h2Red'>Delete Message</h2>
            </Link>
            <Link to='/user' className='btn'>
                <img src={userImg} alt='User messages' />
                <h2 className='h2'>User Messages</h2>
            </Link>
            <Link to='/edit' className='btn'>
                <img src={editImg} alt='edit message' />
                <h2 className='h2'>Edit Message</h2>
            </Link>
        </div>
    )
}
