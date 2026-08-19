import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { generateRoomId } from "../utils/generateRoomId";
import { GameManager } from "../games/gameManager";
import * as cookie from "cookie";
import jwt from "jsonwebtoken";
const gameManager = new GameManager();

export function initializeSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      return next(new Error("Authentication required"));
    }

    const parsedCookies = cookie.parseCookie(cookies);
    const token = parsedCookies.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      return next(new Error("JWT secret is not configured"));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      socket.userId = decoded.userId;
      console.log("Authenticated user:", decoded.userId);

      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    console.log("Authenticated user ID:", socket.userId);

    socket.on("create-room", () => {
      const roomId = generateRoomId();

      const game = gameManager.createGame(roomId, socket.id, socket.userId);
      // 2. Join the room
      socket.join(roomId);

      // 3. Emit "room-created" back to this socket
      socket.emit("room-created", roomId);
      socket.emit("game-created", game);
      socket.emit("player-assigned", "circle");
      console.log(`Room ${roomId} created by ${socket.id}`);
      console.log("Game:", game);
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

      const game = gameManager.joinGame(joinRoomId, socket.id, socket.userId);
      socket.join(joinRoomId);

      // Send room ID only to the player who joined
      socket.emit("room-joined", joinRoomId);
      socket.emit("game-created", game);
      socket.emit("player-assigned", "cross");

      // Notify everyone in the room that a new player has joined
      io.to(joinRoomId).emit("player-joined");
      console.log("Game:", game);
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
