import React from 'react'
import '../footerHome/footerHome.css';
import sendMessageBtn from '../../assets/send-message-btn.svg';

function FooterHome() {
    return (
        <div className='footer'>
            <button className='send-message-btn'>
                <img src={sendMessageBtn} alt='Send mesage' />
            </button>
        </div>
    )
}

export default FooterHome
