import React, { useState, useEffect } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//Internal imports
import Style from "./PlayerInput.module.css";

interface PlayerInputProps {
  onSubmit: (points: number, multiplier: number) => void;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ onSubmit }) => {
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
    setMultiplier((prev) =>
      increment
        ? Math.round((prev + 0.1) * 100) / 100
        : Math.round((prev - 0.1) * 100) / 100
    );
  };

  const handleSubmit = () => {
    if (totalPoints >= points) {
      setTotalPoints((prev) => prev - points);
      onSubmit(points, multiplier);
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
            type="number"
            value={multiplier.toFixed(2)}
            className={Style.playerInput__multiplier_input}
            // readOnly
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
            icon: {totalPoints}
          </div>
          <div className={Style.playerInput__name}>icon: {playerName}</div>
          <div className={Style.playerInput__timer}>
            icon {formatTime()}
          </div>
        
        </div>
      </div>

      <button className={Style.playerInput__submit} onClick={handleSubmit}>
        Start
      </button>
    </div>
  );
};

export default PlayerInput;
