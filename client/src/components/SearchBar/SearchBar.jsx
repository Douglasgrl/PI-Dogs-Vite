import React from 'react'
import { useState } from 'react'
import "./SearchBar.css"
import { useDispatch } from 'react-redux'
import { onSearchName } from "../../redux/actions"

export default function SearchBar() {

  const [name, setName] = useState("")
  
  const dispatch = useDispatch()

  const handleChange = (event)=>{
    setName(event.target.value)
  }

  const add = () =>{
    dispatch(onSearchName(name))
    setName("");
  }
 
  return (
    <div className='Container__Search'>

        <input className='Input__Search' value={name} onChange={handleChange} type="search" placeholder='Enter your name' />

      <button className="button__search" onClick={add}><p>Search</p>
      </button>

    </div>
  )
}
