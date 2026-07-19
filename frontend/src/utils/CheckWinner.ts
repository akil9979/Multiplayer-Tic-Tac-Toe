import type { Winner, Cell } from "../types/game";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board: Cell[]): Winner {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    const first = board[a];
    const second = board[b];
    const third = board[c];

    if (first !== null && first === second && second === third) {
      return first;
    }
    if (!board.includes(null)) {
      return "draw";
    }
  }
  return null;
}
