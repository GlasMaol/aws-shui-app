import React from 'react';
import Header from '../../components/header/Header';
import UserMessagesList from '../../components/userMessagesList/UserMessagesList';
import FooterHome from '../../components/footerHome/FooterHome';
import '../userMessagesPage/userMessages.css';


const UserMessages = () => {
    return (
        <div className='homeContainer'>
            <Header />
            <main className='mainContent'>
                <UserMessagesList />
            </main>
            <FooterHome />
        </div>
    );
}

export default UserMessages;
