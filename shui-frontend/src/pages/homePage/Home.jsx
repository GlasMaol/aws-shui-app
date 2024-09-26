import React, { useState, useRef, useEffect } from 'react';
import FooterHome from '../../components/footerHome/FooterHome';
import Header from '../../components/header/Header';
import '../../pages/homePage/home.css';
import MessageList from '../../components/messageContainer/MessageList';
import Nav from '../../components/nav/Nav';

function Home() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState({ MessageID: null, UserName: '' });
    const navRef = useRef();

    const handleMessageClick = (message) => {
      setSelectedMessage(message);
      setIsNavVisible(true);
  };

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsNavVisible(false);
        }
    };

    useEffect(() => {
        if (isNavVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNavVisible]);

    return (
        <div className='homeContainer'>
            <Header />
            <main className='mainContent'>
                <MessageList onMessageClick={handleMessageClick} />
                {isNavVisible && (
                    <div ref={navRef}>
                        <Nav MessageID={selectedMessage.MessageID} UserName={selectedMessage.UserName} />
                    </div>
                )}
            </main>
            <FooterHome />
        </div>
    );
}

export default Home;