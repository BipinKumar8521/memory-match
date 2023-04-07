import React, { useEffect, useState } from 'react'
import  secureLocalStorage  from  "react-secure-storage";

export default function HighScore({score, gameOver, levels}) {

const getHighScoreEasy = () =>{
    let LocalHighScoreEasy = secureLocalStorage.getItem('High_ScoreEasy')
    if(LocalHighScoreEasy){
        return JSON.parse(LocalHighScoreEasy)
    }
    else{
        return 0
    }
}
const getHighScoreMedium = () =>{
    let LocalHighScoreMedium = secureLocalStorage.getItem('High_ScoreMedium')
    if(LocalHighScoreMedium){
        return JSON.parse(LocalHighScoreMedium)
    }
    else{
        return 0
    }
  }

const getHighScoreHard = () =>{
    let LocalHighScoreHard = secureLocalStorage.getItem('High_ScoreHard')
    if(LocalHighScoreHard){
        return JSON.parse(LocalHighScoreHard)
    }
    else{
        return 0
    }
}

const[HighScore, setHighScore]= useState(0)
  const[HighScoreEasy, setHighScoreEasy]= useState(getHighScoreEasy())
  const[HighScoreMedium, setHighScoreMedium]= useState(getHighScoreMedium())
  const[HighScoreHard, setHighScoreHard]= useState(getHighScoreHard())
  

  useEffect(() =>{
if(levels==="Easy")  setHighScore(HighScoreEasy)
else if(levels==="Medium")  setHighScore(HighScoreMedium)
else if (levels==="Hard")   setHighScore(HighScoreHard)
  },[gameOver, levels])



useEffect (()=>{
if(score>HighScoreEasy&&levels==="Easy"){
    setHighScoreEasy(score)
}
else if(score>HighScoreMedium&&levels==="Medium"){
    setHighScoreMedium(score)
}
else if(score>HighScoreHard&&levels==="Hard"){
    setHighScoreHard(score)
}
},[gameOver])

useEffect(()=>{
  if(levels==="Easy"){
    secureLocalStorage.setItem('High_ScoreEasy', JSON.stringify(HighScoreEasy))
  }
  if(levels==="Medium"){
    secureLocalStorage.setItem('High_ScoreMedium', JSON.stringify(HighScoreMedium))
  }
  if(levels==="Hard"){
    secureLocalStorage.setItem('High_ScoreHard', JSON.stringify(HighScoreHard))
  }
},[HighScoreEasy, HighScoreMedium, HighScoreHard])
  return (
    <>
      <p>High Score : {HighScore}</p>
    </>
  )
}
