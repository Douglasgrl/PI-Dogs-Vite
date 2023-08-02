import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { LogoLogout } from '../../svg/Logos'
import './Nav.css'

export default function Nav() {
  return (
    <div className='Container__Nav'>

        <Link className='Nav__Link' to={"/home"}>Home</Link>

        <Link className='Nav__Link' to={"/create"}>Create</Link>

        <Link className='Nav__Link' to={"/about"}>About</Link>

        <SearchBar/>

        <Link className='Nav__Logout' to={"/"}><button className='Button__Logout'> <LogoLogout className="Logo__Logout"/></button></Link>
      
    </div>
  )
}
