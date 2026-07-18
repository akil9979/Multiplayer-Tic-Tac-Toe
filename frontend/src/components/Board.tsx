import { useState } from "react";
import type { Cell } from "../types/game";
import Square from "./Square/Square";

function Board() {
  const [board, setBoard] = useState<Cell[]>(
    Array(9).fill(null)
  );

    function handleSquareClick(index: number): void {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[index] = "cross";  
        return newBoard;
      });
    }

  return (
  <div>
   {board.map((cell,index) => (
     <Square value={cell} key={index} onClick={() => handleSquareClick(index)} />
   ))}
  </div>);
  
}

export default Board;