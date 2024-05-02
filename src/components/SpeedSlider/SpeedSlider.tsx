import React from 'react'

//internal imports
import Style from './SpeedSlider.module.css'

interface SpeedSliderProps {
  speed: number;
  setSpeed: (value: number) => void;
}

const SpeedSlider: React.FC<SpeedSliderProps> = ({ speed, setSpeed }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(event.target.value));
  };

  const fillPercentage = ((speed - 1) / (5 - 1)) * 100;
  
  const getMarkStyle = (value: number) => {
    return {
      color: speed >= value ? '#FF69B4' : '#fff', 
    };
  };

  return (
    <div className={Style.speedSlider}>
      <h3 className={Style.speedSlider__title} >icon Speed</h3>
      <input
        type="range"
        id="speed-slider"
        className={Style.speedSlider__input}
        style={{ background: `linear-gradient(90deg,  #FF69B4 ${fillPercentage}% , #555 ${fillPercentage}%)` }}
        min="1"
        max="5"
        value={speed}
        onChange={handleChange}
      />
      <div className={Style.speedSlider__marks}>
      <span style={getMarkStyle(1)}>1x</span>
        <span style={getMarkStyle(2)}>2x</span>
        <span style={getMarkStyle(3)}>3x</span>
        <span style={getMarkStyle(4)}>4x</span>
        <span style={getMarkStyle(5)}>5x</span>
      </div>
    </div>
  );
}

export default SpeedSlider;