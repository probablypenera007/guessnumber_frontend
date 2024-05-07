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
import * as api from "../../utils/api";

//Internal imports
import Style from "./App.module.css";
import GameBoard from "../GameBoard/GameBoard";
import WelcomeModal from "../WelcomeModal/WelcomeModal";


//interface
interface User {
  name: string;
  points: number;
}


function App() {
  const [cpuPlayers, setCpuPlayers] = useState(generateInitialCPUPlayers());
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [finalMultiplier, setFinalMultiplier] = useState(0);
  const [totalPoints, setTotalPoints] = useState(1000);
  const [currentUser, setCurrentUser] =  useState<User | null>(null);

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
    setCurrentUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, points: prevUser.points + pointsToAdd };
      }
      return prevUser;
    });
  }, [setCurrentUser]);


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
    
     // Update points for all players
  setCpuPlayers(cpuPlayers.map((player, index) => {
    const isLoser = index === indexLoser;
    const updatedPoints = isLoser ? 0 : player.points * multiplier;

    if (currentUser && player.name === currentUser.name) {
      const pointsChange = multiplier > 0 ? (updatedPoints - player.points) : 0;
      updateTotalPoints(pointsChange);
    }

      return {
        ...player,
        points: updatedPoints
      };
    }));
  }, [cpuPlayers, updateTotalPoints, currentUser]);


//LOGIN / Register
const handleRegistration = (name: string) => {
  api.register({ name }).then(user => {
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setTimeout(() => {
      setCurrentUser(null); // Clear user data after 21 minutes and 30 seconds
      localStorage.removeItem('user');
    }, 1290000); // 1290000 milliseconds = 21 minutes and 30 seconds
  }).catch(error => {
    console.error('Registration failed:', error);
  });
};


  return (
    <CurrentUserContext.Provider value={currentUser}> 
    <div className={Style.App}>
    {!currentUser && <WelcomeModal onAccept={handleRegistration} />}
      <PlayerInput 
      onStartGame={handleStartGame}
      updateTotalPoints={updateTotalPoints} 
      gameEnded={finalMultiplier > 0}
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
      <ChatBox  />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
