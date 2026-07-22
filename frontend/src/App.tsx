import { useEffect } from "react";
import { socket } from "../src/Socket.ts";
import Board from "../src/components/Board.tsx";
function App() {
   useEffect(() => {
    console.log("Socket ID:", socket.id);

    socket.on("connect", () => {
      console.log("Connected!");
      console.log("Socket ID:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <>
        <h1>Tic Tac Toe</h1>
        <Board />
    </>
    
  );
}

export default App;