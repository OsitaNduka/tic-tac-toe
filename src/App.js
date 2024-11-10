import React, { useState } from 'react';
import './App.css';

function App() {
  // Define the initial state for the game
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("Next player: X");

  // Winning combinations for Tic-Tac-Toe
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check if a player has won the game
  const calculateWinner = (squares) => {
    for (let [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle clicking on a square
  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";

    setSquares(newSquares);
    const winner = calculateWinner(newSquares);

    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (!newSquares.includes(null)) {
      setStatus("Tie");
    } else {
      setIsXNext(!isXNext);
      setStatus(`Next player: ${isXNext ? "O" : "X"}`);
    }
  };

  // Reset the game to initial state
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setStatus("Next player: X");
  };

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <button 
            key={index} 
            className="square" 
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}

export default App;

