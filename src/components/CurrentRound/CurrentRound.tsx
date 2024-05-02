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
  finalMultiplier
}) => {
  const defaultPlayers = ["You", "CPU 1", "CPU 2", "CPU 3", "CPU 4"];

  const renderTableRows = () => {
    const playerData = gameStarted ? players : defaultPlayers.map(player => ({ name: player, points: '-', multiplier: '-' }));

    return playerData.map((player, index) => {
      let rowStyle: string = '';
      switch (index) {
        case 0:
          rowStyle = Style["table__row--you"] as string;
          break;
        case 1:
        case 3:
          rowStyle = Style["table__row--cpu1"] as string;
          break;
        case 2:
        case 4:
          rowStyle = Style["table__row--cpu2"] as string;
          break;
        default:
          break;
      }

    return (
      <tr key={player.name} className={rowStyle}>
        <td className={Style.table__data}>{player.name}</td>
        <td className={Style.table__data}>{typeof player.points === 'number' ? player.points : '-'}</td>
        <td className={Style.table__data}>{typeof player.multiplier === 'number' ? player.multiplier : '-'}</td>
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
