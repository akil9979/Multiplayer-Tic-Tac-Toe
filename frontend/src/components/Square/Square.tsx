import type { Cell } from "../../types/game";

interface  SquareProps{
    value:Cell
}



export default function Square({value}: SquareProps) {
  return (
    <>
        <button >{value}</button>
    </>
  )
}
