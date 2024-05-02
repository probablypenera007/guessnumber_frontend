import React from "react";

//internal imports
import Style from "./CurrentRound.module.css";

interface CurrentRoundProps {
  players: { name: string; points: number; multiplier: number }[];
  gameStarted: boolean;
  finalMultiplier: number;
}

const CurrentRound: React.FC<CurrentRoundProps> = ({
  players,
  gameStarted,
  finalMultiplier,
}) => {
  const renderTableRows = () => {
    let maxDifference = 0;
    let indexLoser = -1; 

    if (!gameStarted && finalMultiplier > 0) {
      players.forEach((player, index) => {
        let difference = Math.abs(player.multiplier - finalMultiplier);
        if (difference > maxDifference) {
          maxDifference = difference;
          indexLoser = index;
        }
      });
    }

    return players.map((player, index) => {
      let baseRowStyle: string = "";
      switch (index) {
        case 0:
          baseRowStyle = Style["table__row--you"];
          break;
        case 1:
        case 3:
          baseRowStyle = Style["table__row--cpu1"];
          break;
        case 2:
        case 4:
          baseRowStyle = Style["table__row--cpu2"];
          break;
        default:
          break;
      }

      let resultStyle = "";
      if (!gameStarted && finalMultiplier > 0) {
        resultStyle = (index === indexLoser) ? Style["table__row--loser"] : Style["table__row--winner"];
      }

      const pointsDisplay = (gameStarted || finalMultiplier > 0) 
      ? parseFloat(player.points.toFixed(2)) 
      : "-";      const multiplierDisplay = (gameStarted || finalMultiplier > 0) ? player.multiplier.toFixed(2) : "-";

      const rowStyle = resultStyle ? `${baseRowStyle} ${resultStyle}` : baseRowStyle;

      return (
        <tr key={player.name} className={rowStyle}>
          <td className={Style.table__data}>{player.name}</td>
          <td className={Style.table__data}>{pointsDisplay}</td>
          <td className={Style.table__data}>{multiplierDisplay}</td>
        </tr>
      );
    });
  };

  return (
    <div className={Style.currentRound}>
      <h3 className={Style.currentRound__title}>icon Current Round</h3>
      <table className={Style.currentRound__table}>
        <thead className={Style.currentRound__tableHeader}>
          <tr className={Style.table__row}>
            <th className={Style.tableH}>Name</th>
            <th className={Style.tableH}>Point</th>
            <th className={Style.tableH}>Multiplier</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default CurrentRound;
