import type { Cell } from "../../types/game";

interface  SquareProps{
    value:Cell,
    onClick: () => void
}



export default function Square({value, onClick}: SquareProps) {
  return (
    <>
        <button onClick={onClick}>{value}</button>
    </>
  )
}
