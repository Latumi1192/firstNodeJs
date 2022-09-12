import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';



// class Square extends React.Component {

//     render() {
//       return (
//         <button 
//             className="square" 
//             onClick={() => this.props.onClick()}
//             >
//           {this.props.value}
//         </button>
//       );
//     }
//   }


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

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

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        square: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0
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
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
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
      </div>
    );
  }
}


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      thisAccount: 'Honghai',
      thisPassword: '123',
      isLoggedIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.state.account === this.state.thisAccount && this.state.password === this.state.thisPassword) {
      this.setState({ isLoggedIn: true });
    } else return;
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <form onSubmit={() => { this.handleSubmit(); }}>
            <div>
              <input placeholder='Account' onChange={e => this.setState({account: e.target.value})}></input>
            </div>
            <div>
              <input placeholder='Password' onChange={e => this.setState({password: e.target.value})}></input>
            </div>
            <div>
              <button type='submit'>Submit!</button>
            </div>
          </form>
        
        </div>
      )
    } else return <Redirect to={'/game'} />
  }
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Route exact path="/game"> <Game /> </Route>
      <Route exact path="/"><LoginForm /> </Route>
    </Switch>
  </Router>
);
