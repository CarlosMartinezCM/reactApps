import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';

const Square = (props) => {

  return (
    <button
      className='square'
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  );
};

const Board = () => {
  //Initiallize the board. 
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const newSquares = [...squares];

    //Determine the winner 'X' or 'O'
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareFilled) {
      alert(`we have a winner`);
      return Board;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClickEvent={() => handleClickEvent(i)}
      />
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Next player: ${xIsNext ? 'X' : 'O'}`;

  // const status = () => {
  //   if(status === winner)
  //     return (`Winner: ${winner}`);
  //   if(status !== winner)
  //     return (`Next player: ${xIsNext ? 'X' : 'O'}`);
  //  };

  

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className='game'>
      Tic-Tac-Toe
      <Board />
      <button 
        className='resetGameBtn'
        onClick={resetGame}>
        reset game
      </button>
    </div>

  );
};
function resetGame() {

    alert(`reset button pressed`);
    return (
      <Game />
    );
  };

function calculateWinner(squares) {
  const lines =[
    [0, 1, 2], [3 , 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6], //diagnols
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return squares[a]; // 'X' or 'O'
    }
  }
  return null;
};

// Get root element from the DOM
const rootElement = document.getElementById('root');

// Create root
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Game />);
}

