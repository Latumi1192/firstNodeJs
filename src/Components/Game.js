import React from 'react'
import Board from './Board'
import Button from '@mui/material/Button'

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
  let GameState = {
    history: [{
      square: Array(9).fill(null)
    }],
    xIsNext: true,
    stepNumber: 0
  }

  function jumpTo (step) {
    GameState.stepNumber = step
    GameState.xIsNext = (step % 2) === 0
  }

  function handleClick (i) {
    const history = GameState.history.slice(0, GameState.stepNumber + 1)
    const current = history[history.length - 1]
    const square = current.square.slice()
    if (calculateWinner(square) || square[i]) {
      return
    }
    square[i] = GameState.xIsNext ? 'X' : 'O'
    GameState = {
      history: history.concat([{ square }]),
      stepNumber: history.length,
      xIsNext: !GameState.xIsNext
    }
  }

  const history = GameState.history
  const current = history[GameState.stepNumber]
  const winner = calculateWinner(current.square)

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move: ' + move : 'Go to game start'
    return (
      <li key={move}>
        <Button variant="text" size="small" onClick={() => jumpTo(move)}>{desc}</Button>
      </li>
    )
  })

  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (GameState.xIsNext ? 'X' : 'O')

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
