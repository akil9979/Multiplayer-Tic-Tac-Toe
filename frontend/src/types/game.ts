export type PlayerSign =
  | "circle"
  | "cross";

export type Cell =
  | null
  | PlayerSign;

export type Winner =
  | PlayerSign
  | "draw"
  | "opponentLeftMatch"
  | null;