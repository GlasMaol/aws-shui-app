import React from 'react'
import '../footerHome/footerHome.css';
import newMessageBtn from '../../assets/new-message-btn.svg';
import { Link } from 'react-router-dom';

function FooterHome() {
    return (
        <div className='footer'>
            <Link to='/post' className='send-message-btn'>
                <img src={newMessageBtn} alt='Send mesage' />
            </Link>
        </div>
    )
}

export default FooterHome
