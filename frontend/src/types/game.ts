export type Player = "circle" | "cross";

export type Cell = Player | null;

export type Winner = Player | "draw" ;

export interface Game {
  board: Cell[];
  currentPlayer: Player;

  winner: Winner;
}