import { useEffect, useState } from "react";
import { socket } from "../src/Socket.ts";
import Board from "../src/components/Board.tsx";
function App() {
  const [createdRoomId, setCreatedRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateRoom = () => {
    socket.emit("create-room");
  };

  const joinRoom = () => {
    if (!joinRoomId.trim()) {
      alert("Please enter a room code.");
      return;
    }

    socket.emit("join-room", joinRoomId);
  };

  useEffect(() => {
    console.log("Socket ID:", socket.id);

    socket.on("connect", () => {
      console.log("Connected!");
      console.log("Socket ID:", socket.id);
    });
    socket.on("room-created", (roomId) => {
      setCreatedRoomId(roomId);
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

    return () => {
      socket.off("connect");
      socket.off("room-created");
      socket.off("room-not-found");
      socket.off("room-full");
      socket.off("player-joined");
    };
  }, []);

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <button onClick={handleCreateRoom}>Create Room</button>

      <p>Room Code: {createdRoomId}</p>

      <input
        value={joinRoomId}
        onChange={(e) => setJoinRoomId(e.target.value)}
        placeholder="Enter Room Code"
      />
      <button onClick={joinRoom}>join room</button>

      <Board />
    </>
  );
}

export default App;
