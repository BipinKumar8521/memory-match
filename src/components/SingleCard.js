import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {
  const tapMusic =() =>{
    let tap = new Audio("/memory-match/music/tap.mp3");
    tap.play()
  }


    const handleClick =() => {
      if(!disabled){
        handleChoice(card)
        tapMusic()
          }    }
  return (
    <div className="card" >
    <div className={flipped ? "flipped" : ""}>
      <img className="front" src={card.src} alt="card-front" />
      <img className="back" src="/memory-match/img/cover.jpg" alt="card-back"
      onClick={handleClick}
       />
    </div>

  </div>
  )
}
