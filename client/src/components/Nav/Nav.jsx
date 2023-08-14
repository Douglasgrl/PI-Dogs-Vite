import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { LogoLogout } from '../../svg/Logos'
import { MenuHamburguer } from '../../svg/Logos'
import './Nav.css'

export default function Nav() {

  const [ menu, setMenu ] = useState( false )

  const navigate = useNavigate();

  const toggleMenu = () =>{
    setMenu( !menu )
  }

  const handleLinkClick = (path) => {
    setMenu(false);
    navigate(path);
  };

  return (
    <div className='Container__Nav'>

    <div className='Container__Navigate'>


      <div className={`Container__Menu ${ menu ? 'isActive' : ""}` } >

      <ul className='Nav__Cont'>

      <li className='Nav__Li'>
          <Link className='Nav__Link' to='/home' onClick={() => handleLinkClick('/home')}>
            Home
          </Link>
        </li>
        <li className='Nav__Li'>
          <Link className='Nav__Link' to='/create' onClick={() => handleLinkClick('/create')}>
            Create
          </Link>
        </li>
        <li className='Nav__Li'>
          <Link className='Nav__Link' to='/about' onClick={() => handleLinkClick('/about')}>
            About
          </Link>
        </li>
        <li className='Nav__Li--Logout'>
          <Link className='Nav__Link' to='/' onClick={() => handleLinkClick('/')}>
            Logout
          </Link>
        </li>

      </ul>
      </div>
      <div className='DivS'>
      <SearchBar/>

      <button className='Button__Hamburguer' onClick={toggleMenu}><MenuHamburguer/></button>
        
      </div>

      </div>

        <Link className='Nav__Logout' to={"/"}><button className='Button__Logout'> <LogoLogout className="Logo__Logout"/></button></Link>


    </div>
  )
}
