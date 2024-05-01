import React from 'react'

//internal imports
import Style from './GameBoard.module.css'

interface GameBoardProps {
  speed: number
}

const GameBoard: React.FC<GameBoardProps> = ({speed}) => {


  return (
    <div className={Style.gameBoard}>
     <div className={Style.grah}>
      <h1 className={Style.graph__multiplier} >5.00x</h1>
     </div>
    </div>
  )
}

export default GameBoard