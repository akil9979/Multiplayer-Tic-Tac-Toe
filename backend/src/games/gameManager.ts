import type { Game } from "../types/game";
import { checkWinner } from "./checkWinner";
export class GameManager {
  private games = new Map<string, Game>();

  createGame(roomId: string, socketId: string): void {
    if (this.games.has(roomId)) {
      return;
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
  }

  joinGame(roomId: string, socketId: string): void {
    const game = this.games.get(roomId);
    if (!game) {
      return;
    }
    game.players.cross = socketId;
  }

  makeMove(roomId: string, index: number, socketId: string) {
    const game = this.games.get(roomId);

    if (!game) {
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

}
