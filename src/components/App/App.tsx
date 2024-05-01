import React, { useState } from "react";

// -------------------------------
// COMPONENT IMPORTS
// -------------------------------
import PlayerInput from "../PlayerInput/PlayerInput";
import CurrentRound from "../CurrentRound/CurrentRound";
import SpeedSlider from "../SpeedSlider/SpeedSlider";

// -------------------------------
// CONTEXT AND UTILITY IMPORTS
// -------------------------------
//note: will use useContext for currentUser
import { generateInitialCPUPlayers, startGame } from "../../utils/cpuPlayers";

//Internal imports
import Style from "./App.module.css";
import GameBoard from "../GameBoard/GameBoard";


function App() {
  const [cpuPlayers, setCpuPlayers] = useState(generateInitialCPUPlayers());
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleStartGame =  (points: number, multiplier: number) => {
    setGameStarted(true);
    const updatedPlayers = startGame(cpuPlayers).map(player => ({
      ...player,
      points: player.name === "You" ? points : player.points,
      multiplier: player.name === "You" ? multiplier : player.multiplier
    }));
    setCpuPlayers(updatedPlayers);  
  };

  return (
    <div className={Style.App}>
      <PlayerInput onStartGame={handleStartGame}/>
      <GameBoard speed={speed}/>
      <CurrentRound
        players={cpuPlayers} gameStarted={gameStarted}
      />
   
      <SpeedSlider speed={speed} setSpeed={setSpeed} />
    </div>
  );
}

export default App;
