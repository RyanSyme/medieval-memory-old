import { useEffect, useState} from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle choices
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // check if cards match
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1100)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset card values & increase No. of turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Medieval Memory</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App