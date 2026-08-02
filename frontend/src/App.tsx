import { useEffect, useState } from "react";
import { socket } from "../src/Socket.ts";
import Board from "../src/components/Board.tsx";
import type { Game, Player } from "./types/game.ts";
function App() {
  const [roomId, setRoomId] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const [game, setGame] = useState<Game | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  const handleCreateRoom = () => {
    socket.emit("create-room");
  };

  const joinRoom = () => {
    if (!roomInput.trim()) {
      alert("Please enter a room code.");
      return;
    }

    socket.emit("join-room", roomInput);
  };

  useEffect(() => {
    console.log("Socket ID:", socket.id);

    socket.on("connect", () => {
      console.log("Connected!");
      console.log("Socket ID:", socket.id);
    });
    socket.on("room-created", (roomId) => {
      setRoomId(roomId);
    });
    socket.on("room-not-found", () => {
      alert("Room not found!");
    });
    socket.on("room-full", () => {
      alert("Room is full!");
    });

    socket.on("player-joined", () => {
      alert("A player has joined the room!");
    });

    socket.on("game-created", (createdGame) => {
      setGame(createdGame);
    });

    socket.on("player-assigned", (player) => {
      setPlayer(player);
    });

    socket.on("room-joined", (joinedRoomId) => {
      setRoomId(joinedRoomId);
    });

    socket.on("game-updated", (updatedGame) => {
      setGame(updatedGame);
      // console.log("Game updated:", updatedGame);
    });
    socket.on("player-disconnected", (updatedGame) => {
      setGame(updatedGame);
      alert("Your opponent has disconnected!");
    });

    return () => {
      socket.off("connect");
      socket.off("room-created");
      socket.off("player-assigned");
      socket.off("room-not-found");
      socket.off("room-full");
      socket.off("player-joined");
      socket.off("game-updated");
      socket.off("game-created");
      socket.off("room-joined");
      socket.off("player-disconnected");
    };
  }, []);

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <button onClick={handleCreateRoom}>Create Room</button>

      <p>Room Code: {roomId}</p>

      <input
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
        placeholder="Enter Room Code"
      />
      <button onClick={joinRoom}>join room</button>

      {game !== null && (
        <>
          <p>You are: {player === "circle" ? "⭕ Circle" : "❌ Cross"}</p>

          <p>
            {game.currentPlayer === player
              ? "🎯 Your Turn"
              : "⏳ Opponent's Turn"}
          </p>
        </>
      )}

      <Board game={game} roomId={roomId} />
    </>
  );
}

export default App;
