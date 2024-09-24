import React from 'react'
import FooterHome from '../../components/footerHome/FooterHome'
import Header from '../../components/header/Header'
import '../../pages/homePage/home.css'
import MessagesList from '../../components/messageContainer/Message'

function Home() {


  return (
    <div className='homeContainer'>
      <Header />
      <main className='mainContent'>
        <MessagesList />
      </main>
      <FooterHome />

    </div>

  )
}

export default Home
