import React from "react";

//internal imports
import Style from "./Ranking.module.css";

interface Player {
  name: string;
  points: number;
}

interface RankingProps {
  players: Player[];
  gameEnded: boolean;
}

const Ranking: React.FC<RankingProps> = ({ players, gameEnded }) => {
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  const getRowStyle = (index: number) => {
    switch (index) {
      case 0:
        return Style["table__row--you"]; 
      case 1:
      case 3:
        return Style["table__row--cpu1"]; 
      case 2:
      case 4:
        return Style["table__row--cpu2"]; 
      default:
        return ""; 
    }
  };

  return (
    <div className={Style.ranking}>
      <h3 className={Style.ranking__title}>Ranking</h3>
      <table className={Style.ranking__table}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {gameEnded ? (
            sortedPlayers.map((player, index) => (
              <tr key={player.name} className={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.points.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className={getRowStyle(index)}>
                <td>{index + 1}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
