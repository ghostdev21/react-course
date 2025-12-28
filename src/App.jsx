import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants/TURNS"
import { WinnerModal } from "./components/WinnerModal"
import { checkEndGame } from "./utils/board"
import { checkWinner } from "./utils/board"

function App() {


  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.x)
  const [winner, setWinner] = useState(null)



  const resetGame  = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }



  const updateBoard = (index) => {

    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)

    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  
  return (
    <main className="board">
      <h1>Hello world</h1>
      <button onClick={resetGame}>reset del juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
              updateBoard={updateBoard}
              key={index}
              index={index}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>

      </section>
      <WinnerModal
        resetGame={resetGame}
        winner={winner}
      />
    </main>
  )
}

export default App
