import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [message, setMessage] = useState(null);
  const [cardMatched, setcardMatched] = useState(0);
  const [levelMatched, setLevelMatched] = useState(0);
  const [levels, setLevels] = useState(null);
  const [gridCSS, setGridCSS] = useState("card-grid");

const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)
const [gameOver, setGameOver] = useState(false)


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
    if(levels==="Easy"){
      setGridCSS("card-grid easy")
      setLevelMatched(24)
    }
    else if(levels==="Medium"){
      setGridCSS("card-grid medium")
      setLevelMatched(48)
    }
    else if(levels==="Hard"){
      setGridCSS("card-grid hard")
      setLevelMatched(72)
    }
    else if(levels==="None"){
      alert("Please choose a level")
    }
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              cardMatching()
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
    if(cardMatched===levelMatched){
      setMessage("Won")}
      else{
        setMessage("Lose")
          }}
  }, [choiceOne, choiceTwo, cardMatched, levelMatched])

  useEffect(() => {
    shuffleCards()
  },[])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
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
      <button onClick={shuffleCards}>New Game</button>

<div className="game-content">
      <div className={gridCSS}>
        {cards.map((card) => (
        <SingleCard key={card.id} card={card} handleChoice={handleChoice} 
        flipped ={card===choiceOne || card===choiceTwo || card.matched}
        disabled={disabled}
        />
        ))}
      </div>
      <div className={gameOver? "game-over active": "game-over"}>
        <h2>Game over</h2>
        <p>You {message} with {turns} turns.</p>
      </div>
      </div>
      <p> Turns: {turns}</p>
    </div>
  );
}

export default App;
