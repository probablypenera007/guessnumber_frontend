import React, { useState, useCallback } from "react";

// -------------------------------
// COMPONENT IMPORTS
// -------------------------------
import PlayerInput from "../PlayerInput/PlayerInput";
import CurrentRound from "../CurrentRound/CurrentRound";
import SpeedSlider from "../SpeedSlider/SpeedSlider";
import Ranking from "../Ranking/Ranking";
import ChatBox from "../ChatBox/ChatBox";

// -------------------------------
// CONTEXT AND UTILITY IMPORTS
// -------------------------------
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { generateInitialCPUPlayers, startGame } from "../../utils/cpuPlayers";

//Internal imports
import Style from "./App.module.css";
import GameBoard from "../GameBoard/GameBoard";


function App() {
  const [cpuPlayers, setCpuPlayers] = useState(generateInitialCPUPlayers());
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [finalMultiplier, setFinalMultiplier] = useState(0);
  const [totalPoints, setTotalPoints] = useState(1000);

  const handleStartGame = useCallback((points: number, multiplier: number) => {
    setGameStarted(true);
    setCpuPlayers(startGame(cpuPlayers).map(player => ({
      ...player,
      points: player.name === "You" ? points : player.points,
      multiplier: player.name === "You" ? multiplier : player.multiplier
    })));
    setFinalMultiplier(0);
  }, [cpuPlayers]);

  const updateTotalPoints = useCallback((pointsToAdd: number) => {
    setTotalPoints((prevTotalPoints) => prevTotalPoints + pointsToAdd);
  }, []);


  const handleGameEnd = useCallback((multiplier: number) => {
    setFinalMultiplier(multiplier);
    setGameStarted(false);
    let maxDifference = 0;
    let indexLoser = -1;
  
    cpuPlayers.forEach((player, index) => {
      let difference = Math.abs(player.multiplier - multiplier);
      if (difference > maxDifference) {
        maxDifference = difference;
        indexLoser = index;
      }
    });
  
  setCpuPlayers(cpuPlayers.map((player, index) => {
    const updatedPoints = index === indexLoser ? 0 : player.points * multiplier;
    if (player.name === "Thomas") {
      updateTotalPoints(updatedPoints - player.points); 
    }
    return {
      ...player,
      points: updatedPoints
    };
  }));
}, [cpuPlayers, updateTotalPoints]);




  return (
    <CurrentUserContext.Provider value={currentUser}> 
    <div className={Style.App}>
      <PlayerInput 
      onStartGame={handleStartGame}
      updateTotalPoints={updateTotalPoints} 
      />
      <GameBoard 
      speed={speed}
      onGameEnd={handleGameEnd}
      gameStarted={gameStarted}
      />
      <CurrentRound
        players={cpuPlayers} 
        gameStarted={gameStarted}
        finalMultiplier={finalMultiplier}
      />
   
      <SpeedSlider speed={speed} setSpeed={setSpeed} />
      <Ranking 
      players={cpuPlayers}
      gameEnded={finalMultiplier > 0}
      />
      <ChatBox/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
