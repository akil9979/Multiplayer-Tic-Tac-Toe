import Square from "./Square/Square";

import { socket } from "../Socket.ts";
import type { Game } from "../types/game.ts";

 
type BoardProps = {
    game: Game | null;
    roomId: string;
};


function Board({ game, roomId }: BoardProps) {
  

 

const handleMakeMove = (index: number) => {
    socket.emit("make-move", { roomId, index });
  };
  
if (!game) {
  return <p>Waiting for game...</p>;
}


 

  return (
    <div>

      
      <h2>Winner: {game.winner}</h2>

      {game.board.map((cell, index) => (
        <Square
          value={cell}
          key={index}
          onClick={() => handleMakeMove(index)}
        />
      ))}
      {/* {game?.winner !== null && (
        <button onClick={() => handleRestart()}> Restart Game</button>
      )} */}
    </div>
  );
}

export default Board;