import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { generateRoomId } from "../utils/generateRoomId";
import { GameManager } from "../games/gameManager";


const gameManager= new GameManager();


export function initializeSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });


  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("create-room", () => {
      const roomId = generateRoomId();

      gameManager.createGame(roomId,socket.id)

      // 2. Join the room
      socket.join(roomId);

      // 3. Emit "room-created" back to this socket
      socket.emit("room-created", roomId);
      console.log(`Room ${roomId} created by ${socket.id}`);
    });

    socket.on("join-room", (joinRoomId) => {
      let room = io.sockets.adapter.rooms.get(joinRoomId);
      if (!room) {
        socket.emit("room-not-found");
      } else {
        if (room.size >= 2) {
          socket.emit("room-full");
        } else {
          gameManager.joinGame(joinRoomId,socket.id)
          socket.join(joinRoomId);
          io.to(joinRoomId).emit("player-joined");
          console.log(`Player ${socket.id} joined room ${joinRoomId}`);
        }
      }
    });
  });

  return io;
}
