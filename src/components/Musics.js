import React, { useEffect, useState } from 'react'

export default function Musics(pause) {
    const [playmusic, setplaymusic]= useState(true)
    const playMusic =() =>{
        let audio = new Audio("/memory-match/music/backgroundMusic.mp3");
        audio.play()
      }
   useEffect(() =>{
    playMusic()
   })
  return (
    <div>
     

    </div>
  )
}
