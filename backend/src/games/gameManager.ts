import type { Game } from "../types/game";
import { checkWinner } from "./checkWinner";
export class GameManager {
  private games = new Map<string, Game>();

  createGame(roomId: string, socketId: string): Game {
    if (this.games.has(roomId)) {
      return this.games.get(roomId)!;
    }
    const game: Game = {
      board: Array(9).fill(null),
      currentPlayer: "circle",
      players: {
        circle: socketId,
      },
      winner: null,
    };

    this.games.set(roomId, game);
    return game;
  }

  joinGame(roomId: string, socketId: string): Game {
    const game = this.games.get(roomId);
    if (!game) {
      throw new Error("Game not found");
    }
    game.players.cross = socketId;
    return game;
  }

  makeMove(roomId: string, index: number, socketId: string): Game | undefined {
    const game = this.games.get(roomId);

    if (!game) {
      return;
    }
    if (!game.players.cross) {
      return;
    }
    if (game.winner !== null) {
      return;
    }
    if (index < 0 || index >= game.board.length) {
      return;
    }

    if (game.board[index] !== null) {
      return;
    }

    const expectedSocket = game.players[game.currentPlayer];

    if (expectedSocket !== socketId) {
      return;
    }

    game.board[index] = game.currentPlayer;

    const winner = checkWinner(game.board);
    if (winner != null) {
      game.winner = winner;
      return game;
    } else {
      game.currentPlayer = game.currentPlayer === "circle" ? "cross" : "circle";
    }
    return game;
  }

  handleDisconnect(
    socketId: string,
  ): { roomId: string; game: Game } | undefined {
    for (const [roomId, game] of this.games) {
      if (game.players.cross === socketId) {
        game.winner = "circle";
        return { roomId, game };
      }

      if (game.players.circle === socketId) {
        if (!game.players.cross) {
          this.games.delete(roomId);
          return undefined; 
        } else if (game.players.cross) {
          game.winner = "cross";
          return { roomId, game };
        }
      }
    }

    return undefined;
  }
}
