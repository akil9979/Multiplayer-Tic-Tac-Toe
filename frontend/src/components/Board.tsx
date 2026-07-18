import { useState } from "react";
import type { Cell } from "../types/game";
import Square from "./Square/Square";

function Board() {
  const [board, setBoard] = useState<Cell[]>(
    Array(9).fill(null)
  );

  return 
  <div>
   {board.map((cell,index) => (
     <Square value={cell} key={index} />
   ))}
  </div>
  
}

export default Board;