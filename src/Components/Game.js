import React from 'react';
import Board from './Board';
import Button from '@mui/material/Button';

//import { BrowserRouter as Redirect } from 'react-router-dom';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                square: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const square = current.square.slice();
        if (calculateWinner(square) || square[i]) {
            return;
        }
        square[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                square: square,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.square);

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move: ' + move : 'Go to game start';
            return (
                <li key={move}>
                    <Button variant="text" size="small" onClick={() => this.jumpTo(move)}>{desc}</Button>
                </li>
            );
        });

        let status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        const gameBoard = (<div className="game">
            <div className="game-board">
                <Board
                    squares={current.square}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div>
                <Button variant="contained" onClick={e => window.location.href = '/'}>Logout</Button>
            </div>
        </div>)

       // return this.props.login ? gameBoard : <Redirect to={'/'} />;
       return gameBoard;

    }
}

export default Game;