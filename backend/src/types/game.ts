export type Player = "circle" | "cross";

export type Cell = Player | null;

export interface Game {
  board: Cell[];
  currentPlayer: Player;

  players: {
    circle: string;
    cross?: string;
  };

  winner: Player | "draw" | null;
}