import React, { useState, useEffect } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Logo from "../../images/img-index";

//Internal imports
import Style from "./PlayerInput.module.css";

interface PlayerInputProps {
  onStartGame: (points: number, multiplier: number) => void;
  updateTotalPoints: (points: number) => void; 
}

const PlayerInput: React.FC<PlayerInputProps> = ({ onStartGame, updateTotalPoints }) => {
  const [points, setPoints] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [totalPoints, setTotalPoints] = useState<number>(1000);
  const [timeLeft, setTimeLeft] = useState<number>(1290); //21 minutes and 30 seconds in milliseconds
  const [playerName, setPlayerName] = useState<string>("Thomas");

  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [timeLeft]);

  const handlePointsChange = (increment: boolean) => {
    if (increment && totalPoints >= points + 10) {
      setPoints((prev) => prev + 10);
    } else if (!increment && points > 0) {
      setPoints((prev) => Math.max(0, prev - 10));
    }
  };

  const handleMultiplierChange = (increment: boolean) => {
    setMultiplier((prev) => {
      let newValue = increment ? prev + 0.25 : prev - 0.25;
      if (newValue < 0.0) newValue = 0.0;
      else if (newValue > 10.0) newValue = 10.0;
      return Math.round(newValue * 100) / 100;
    });
  };

  const handleSubmit = () => {
    if (totalPoints >= points) {
      setTotalPoints((prev) => prev - points);
      onStartGame(points, multiplier);
    } else {
      alert("Not enough points");
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={Style.playerInput}>
      <div className={Style.playerInput__container}>
        <div className={Style.playerInput__points}>
          <button
            className={Style.playerInput__points_down}
            onClick={() => handlePointsChange(false)}
          >
            <TiArrowSortedDown className={Style.icon} />
          </button>
          <p className={Style.playerInput__point_text}>Points</p>
          <input
            type="number"
            value={points}
            className={Style.playerInput__points_input}
            readOnly
          />
          <button
            className={Style.playerInput__points_up}
            onClick={() => handlePointsChange(true)}
          >
            <TiArrowSortedUp className={Style.icon} />
          </button>
        </div>

        <div className={Style.playerInput__multiplier}>
          <button
            className={Style.playerInput__multiplier_down}
            onClick={() => handleMultiplierChange(false)}
          >
            <TiArrowSortedDown className={Style.icon} />
          </button>
          <p className={Style.playerInput__multiplier_text}>Multiplier</p>
          <input
            type="text"
            value={multiplier.toFixed(2)}
            onChange={(e) => setMultiplier(parseFloat(e.target.value))}
            className={Style.playerInput__multiplier_input}
            min="0.00"
            max="10.00"
          />
          <button
            className={Style.playerInput__multipilier_up}
            onClick={() => handleMultiplierChange(true)}
          >
            <TiArrowSortedUp className={Style.icon} />
          </button>
        </div>

        {/* INFO PANEL */}
        <div className={Style.playerInput__infoPanel}>
          <div className={Style.playerInput__totalPoints}>
          <img className={Style.points_logo} src={Logo.pointsLogo} alt="Points logo" /> {totalPoints}
          </div>
          <div className={Style.playerInput__name}>icon: {playerName}</div>
          <div className={Style.playerInput__timer}>icon {formatTime()}</div>
        </div>
      </div>

      <button className={Style.playerInput__submit} onClick={handleSubmit}>
        Start
      </button>
    </div>
  );
};

export default PlayerInput;
