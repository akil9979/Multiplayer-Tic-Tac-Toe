import { useState } from "react";
import type { Cell, PlayerSign, Winner } from "../types/game";
import Square from "./Square/Square";
import { checkWinner } from "../utils/CheckWinner";

function Board() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));

  const [currentPlayer, setCurrentPlayer] = useState<PlayerSign>("cross");

  const [winner, setWinner] = useState<Winner>(null);
  function handleSquareClick(index: number): void {
    if (winner !== null) {
      return;
    }

    if (board[index] !== null) {
      return;
    }
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = currentPlayer;
      const gameWinner = checkWinner(newBoard);

      if (gameWinner !== null) {
        setWinner(gameWinner);
      } else {
        setCurrentPlayer((prev) => (prev === "cross" ? "circle" : "cross"));
      }
      return newBoard;
    });
  }

  function handleRestart() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("cross");
    setWinner(null);
  }

  return (
    <div>
      {board.map((cell, index) => (
        <Square
          value={cell}
          key={index}
          onClick={() => handleSquareClick(index)}
        />
      ))}
      {winner !== null && (
        <button onClick={() => handleRestart()}> Restart Game</button>
      )}
    </div>
  );
}

export default Board;
