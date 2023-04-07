import React, {  useState } from 'react'
import './NewUpdate.css'

export default function NewUpdate() {
    const [Display, setDisplay]= useState(true)
  const changeDisplay =() =>{
setDisplay(false)
  }
  return (
    <div className={Display? "update": "update inactive"}>
      <h2>New Update</h2>
      <p>1. High score feature added with different high scores for each level</p>
      <br /> <br /> <br />
      <p>2. Suggestion feature added.  (Give your suggestions if any)</p>
      <br />
      <button className='NewUpdateBtn' onClick={changeDisplay}>Got it</button>
    </div>
  )
}
