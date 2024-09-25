import React from 'react'
import '../footerHome/footerHome.css';
import sendMessageBtn from '../../assets/send-message-btn.svg';
import { Link } from 'react-router-dom';

function FooterHome() {
    return (
        <div className='footer'>
            <Link to='/post' className='send-message-btn'>
                <img src={sendMessageBtn} alt='Send mesage' />
            </Link>
        </div>
    )
}

export default FooterHome
