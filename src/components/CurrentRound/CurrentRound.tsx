import React from "react";

//internal imports
import Style from "./CurrentRound.module.css";

interface CurrentRoundProps {
  players: { name: string; points: number; multiplier: number }[];
  gameStarted: boolean;
}

const CurrentRound: React.FC<CurrentRoundProps> = ({
  players,
  gameStarted,
}) => {
  const defaultPlayers = ["You", "CPU 1", "CPU 2", "CPU 3", "CPU 4"];

  const renderTableRows = () => {
    if (!gameStarted) {
      return defaultPlayers.map((player) => (
        <tr key={player}>
          <td className={Style.table__data}>{player}</td>
          <td className={Style.table__data}>-</td>
          <td className={Style.table__data}>-</td>
        </tr>
      ));
    }

    return players.map((player) => (
      <tr key={player.name}>
        <td className={Style.table__data}>{player.name}</td>
        <td className={Style.table__data}>{player.points}</td>
        <td className={Style.table__data}>{player.multiplier}</td>
      </tr>
    ));
  };

  return (
    <div className={Style.currentRound}>
      <h3 className={Style.currentRound__title}>Current Round</h3>
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
