import React from 'react'
import FooterHome from '../../components/footerHome/FooterHome'
import Header from '../../components/header/Header'
import '../../pages/homePage/home.css'

function Home() {


  return (
    <div className='homeContainer'>
      <Header />
      <main className='mainContent'>
        <h1>
          Home page
        </h1>
      </main>
      <FooterHome />

    </div>

  )
}

export default Home
