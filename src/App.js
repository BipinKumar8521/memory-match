import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
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

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

      setChoiceOne(null)
      setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
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
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCards()
  },[])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <p>Test your Memory</p>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
        <SingleCard key={card.id} card={card} handleChoice={handleChoice} 
        flipped ={card===choiceOne || card===choiceTwo || card.matched}
        disabled={disabled}
        />
        ))}
      </div>
      <p> Turns: {turns}</p>
    </div>
  );
}

export default App;
