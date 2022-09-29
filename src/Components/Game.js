import React, { useState } from 'react'
import Board from './Board'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'




function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Game () {
  const [xIsNext, setX] = useState(true)
  const [stepNumber, setStep] = useState(0)
  const [history, setHistory] = useState([{ square: Array(9).fill(null) }])

  Game.propTypes ={
    signIn: PropTypes.bool
  }

  function jumpTo (step) {
    setStep(step)
    setX((step % 2) === 0)
  }

  function handleClick (i) {
    const tmpHistory = history.slice(0, stepNumber + 1)
    const current = tmpHistory[tmpHistory.length - 1]
    const square = current.square.slice()

    if (calculateWinner(square) || square[i]) {
      return
    }
    square[i] = xIsNext ? 'X' : 'O'

    setHistory(tmpHistory.concat([{ square }]))
    setStep(tmpHistory.length)
    setX(!xIsNext)
  }

  const tmpHistory = history
  const current = tmpHistory[stepNumber]
  const winner = calculateWinner(current.square)

  const moves = tmpHistory.map((step, move) => {
    const desc = move ? 'Go to move: ' + move : 'Go to game start'
    return (
      <li key={move}>
        <Button variant="text" size="small" onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    )
  })

  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')

  const gameBoard = (
  <div className="game">
            <div className="game-board">
                <Board
                    squares={current.square}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div>
                <Button variant="contained" onClick={e => { window.location.href = '/' }}>Logout</Button>
            </div>
        </div>)
  return gameBoard
}

export default Game
