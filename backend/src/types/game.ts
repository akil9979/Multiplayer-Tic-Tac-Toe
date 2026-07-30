export type Player = "circle" | "cross";

export type Cell = Player | null;

export type Winner = Player | "draw" | null;

export interface Game {
  board: Cell[];
  currentPlayer: Player;

  players: {
    circle: string;
    cross?: string;
  };

  winner: Winner;
}