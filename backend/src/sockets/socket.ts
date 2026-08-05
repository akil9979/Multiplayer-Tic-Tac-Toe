import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { generateRoomId } from "../utils/generateRoomId";
import { GameManager } from "../games/gameManager";
import { Socket } from "dgram";

const gameManager = new GameManager();

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

      const game = gameManager.createGame(roomId, socket.id);

      // 2. Join the room
      socket.join(roomId);

      // 3. Emit "room-created" back to this socket
      socket.emit("room-created", roomId);
      socket.emit("game-created", game);
      socket.emit("player-assigned", "circle");
      console.log(`Room ${roomId} created by ${socket.id}`);
    });

    socket.on("join-room", (joinRoomId) => {
      const room = io.sockets.adapter.rooms.get(joinRoomId);

      if (!room) {
        socket.emit("room-not-found");
        return;
      }

      if (room.size >= 2) {
        socket.emit("room-full");
        return;
      }

      const game = gameManager.joinGame(joinRoomId, socket.id);
      socket.join(joinRoomId);

      // Send room ID only to the player who joined
      socket.emit("room-joined", joinRoomId);
      socket.emit("game-created", game);
      socket.emit("player-assigned", "cross");

      // Notify everyone in the room that a new player has joined
      io.to(joinRoomId).emit("player-joined");
    });
    socket.on("make-move", ({ roomId, index }) => {
      const updatedGame = gameManager.makeMove(roomId, index, socket.id);
      if (updatedGame) {
        io.to(roomId).emit("game-updated", updatedGame);
        console.log(
          `Player ${socket.id} made a move in room ${roomId} at index ${index}`,
        );
      }
    });
    socket.on("disconnect", () => {
      const result = gameManager.handleDisconnect(socket.id);
      if (result) {
        io.to(result.roomId).emit("player-disconnected", result.game);
        console.log(
          `Player ${socket.id} disconnected from room ${result.roomId}`,
        );
      }
    });
    socket.on("request-rematch", (roomId) => {
      const result = gameManager.requestRematch(roomId, socket.id);

      if (!result) {
        return;
      }

      if (result.rematchRequests.circle && result.rematchRequests.cross) {
        const newGame = gameManager.resetGame(result.roomId);

        if (newGame) {
          io.to(result.roomId).emit("rematch-accepted", newGame);
        }

        return;
      }

      socket.to(result.roomId).emit("rematch-requested");

      console.log(
        `Player ${socket.id} requested a rematch in room ${result.roomId}`,
      );
    });
  });

  return io;
}
