import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [message, setMessage] = useState(null);
  const [endMessage, setEndMessage] = useState(null);
  const [score, setScore] = useState(0);
  const [cardMatched, setcardMatched] = useState(0);
  const [levelMatched, setLevelMatched] = useState(0);
  const [levels, setLevels] = useState("None");
  const [gridCSS, setGridCSS] = useState("card-grid");
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)
const [gameOver, setGameOver] = useState(false)
const [pause, setPause] = useState(true)
const [controls, setControls]= useState(false)
const[seconds, setSeconds] = useState(0)
const[minutes, setMinutes] = useState(0)

var timer;








var cardImages =[];
if(levels==="Easy"){
  cardImages = [
    { "src": "/memory-match/img/trophy.jpg", matched: false },
    { "src": "/memory-match/img/helmet-1.png", matched: false },
    { "src": "/memory-match/img/ring-1.png", matched: false },
    { "src": "/memory-match/img/scroll-1.png", matched: false },
    { "src": "/memory-match/img/shield-1.png", matched: false },
    { "src": "/memory-match/img/potion-1.png", matched: false }];
    // setGridCSS("card-grid easy")
}
else if(levels==="Medium"){
   cardImages = [
    { "src": "/memory-match/img/trophy.jpg", matched: false },
    { "src": "/memory-match/img/helmet-1.png", matched: false },
    { "src": "/memory-match/img/ring-1.png", matched: false },
    { "src": "/memory-match/img/scroll-1.png", matched: false },
    { "src": "/memory-match/img/shield-1.png", matched: false },
    { "src": "/memory-match/img/potion-1.png", matched: false },
    { "src": "/memory-match/img/sword-1.png", matched: false },
    { "src": "/memory-match/img/bomb.jpg", matched: false },
    { "src": "/memory-match/img/charge.jpg", matched: false },
    { "src": "/memory-match/img/diamond.jpg", matched: false },
    { "src": "/memory-match/img/flag.jpg", matched: false },
    { "src": "/memory-match/img/gift.jpg", matched: false }];
}
else if(levels === "Hard"){
   cardImages = [
    { "src": "/memory-match/img/trophy.jpg", matched: false },
    { "src": "/memory-match/img/helmet-1.png", matched: false },
    { "src": "/memory-match/img/ring-1.png", matched: false },
    { "src": "/memory-match/img/scroll-1.png", matched: false },
    { "src": "/memory-match/img/shield-1.png", matched: false },
    { "src": "/memory-match/img/potion-1.png", matched: false },
    { "src": "/memory-match/img/sword-1.png", matched: false },
    { "src": "/memory-match/img/bomb.jpg", matched: false },
    { "src": "/memory-match/img/charge.jpg", matched: false },
    { "src": "/memory-match/img/diamond.jpg", matched: false },
    { "src": "/memory-match/img/flag.jpg", matched: false },
    { "src": "/memory-match/img/gift.jpg", matched: false },
    { "src": "/memory-match/img/heart.jpg", matched: false },
    { "src": "/memory-match/img/hourglass.jpg", matched: false },
    { "src": "/memory-match/img/key.jpg", matched: false },
    { "src": "/memory-match/img/money.jpg", matched: false },
    { "src": "/memory-match/img/sheild.jpg", matched: false },
    { "src": "/memory-match/img/tressure.jpg", matched: false },
  ];
}
var count =0;
const shuffleCard=()=>{
  setControls(true)
  shuffleCards()
}

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

      setChoiceOne(null)
      setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
    setGameOver(false)
    setLevelMatched(0)
    setcardMatched(0)
    setDisabled(false)
    setScore(0)
    setPause(true)



    if(levels==="Easy"){
      setGridCSS("card-grid easy")
      setLevelMatched(6)
      setSeconds(20)
      setMinutes(1)
    }
    else if(levels==="Medium"){
      setGridCSS("card-grid medium")
      setLevelMatched(12)
      setSeconds(30)
      setMinutes(2)
    }
    else if(levels==="Hard"){
      setGridCSS("card-grid hard")
      setLevelMatched(18)
      setSeconds(30)
      setMinutes(3)
    }
    else if(levels==="None"){
      setLevelMatched(null)
      setSeconds(0)
      setMinutes(10)
      setPause(true)
      
      if(count!==1){
        alert("Please choose a level")
      }
    }
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(()=>{
    timer= setInterval(()=>{
    setSeconds(seconds-1);
    
    if(seconds===0){
      setMinutes(minutes-1);
      setSeconds(59);
    }
    setScore(prevScore=>prevScore-3)
    
    },1000)
    setDisabled(false)
    if(pause){
      clearInterval(timer);
      setDisabled(true)
    }
    
    if(seconds===0 && minutes===0){
      if(levels!=="None"){
        setGameOver(true);
      }
      setPause(true)
    }
    
    return()=> clearInterval(timer);
    });





  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setTimeout(() => cardMatching(), 500)
        setScore(prevScore => prevScore + 100)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else{
       setTimeout(() => resetTurn(), 800)
      }
    }

    
    if(cardMatched===levelMatched){
      setGameOver(true)
    }
    if(gameOver){
     if(cardMatched===levelMatched){
      setEndMessage("Congratulations🎉")
       setMessage("Won 😊")
       setPause(true)
       setControls(false)
      }
       else{
        setEndMessage("Try Again ")
         setMessage("Lose 😒")
         setDisabled(true)
         setControls(false)
           }}
  
  }, [choiceOne, choiceTwo, cardMatched, levelMatched, gameOver])

  useEffect(() => {
    count =1
    shuffleCards()
  },[count])


  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setScore(prevScore => prevScore - 10)
    setDisabled(false)
  }
  const cardMatching = () => {
    setcardMatched(prevMatch => prevMatch + 1)
  }


  
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <p>Test your Memory</p>
      <select id="levels" value={levels} onChange={e=>setLevels(e.target.value)}>
  <option value="None">Choose Levels</option>
  <option value="Easy">Easy</option>
  <option value="Medium">Medium</option>
  <option value="Hard">Hard</option>
</select>
<br />
      <button onClick={shuffleCard}>New Game</button>
      <div className={controls? "": "play-pause"}>
        <button onClick={()=>setPause(false)}>Start</button>

      <button className={pause? "controls":"controls pause"} onClick={()=> setPause(true)}>Pause</button>
      <button className={pause? "controls pause": "controls"} onClick={()=>setPause(false)}>Resume</button>
      </div>

      <p>Time Remaining: <b>{minutes<10? "0"+minutes: minutes}:{seconds<10? "0"+ seconds: seconds} </b></p>

      <div className={gridCSS}>
        {cards.map((card) => (
        <SingleCard key={card.id} card={card} handleChoice={handleChoice} 
        flipped ={card===choiceOne || card===choiceTwo || card.matched}
        disabled={disabled}
        />
        ))}

<div className={gameOver? "game-over active": "game-over"}>
        <h2>{endMessage}</h2>
        <h3>You {message}</h3>
        <h3>Score : {score<0? 0 : score}</h3>
      </div>
      </div>

      
      
      <p> Turns: {turns}</p>
    </div>
  );
}

export default App;
