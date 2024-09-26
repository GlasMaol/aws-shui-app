import React from 'react'
import '../../components/header/header.css'
import { Link } from 'react-router-dom';

function Header() {


    return (
        <div className='header'>
            <Link to='/'>
                <h1>
                    ShUi
                </h1>
            </Link>

        </div>
    )
}

export default Header
