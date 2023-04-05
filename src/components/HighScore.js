import React, { useEffect, useState } from 'react'
import  secureLocalStorage  from  "react-secure-storage";

export default function HighScore({score, gameOver, levels}) {
const getHighScore = () =>{
    let LocalHighScore = secureLocalStorage.getItem('High_Score')
    if(LocalHighScore){
        return JSON.parse(LocalHighScore)
    }
    else{
        return 0
    }
}
    const[HighScore, setHighScore]= useState(getHighScore())
useEffect (()=>{
if(score>HighScore){
    setHighScore(score)
}
},[gameOver])

useEffect(()=>{
secureLocalStorage.setItem('High_Score', JSON.stringify(HighScore))
},[HighScore])
  return (
    <>
      <p>High Score : {HighScore}</p>
    </>
  )
}
