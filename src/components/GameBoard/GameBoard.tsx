import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  ChartOptions,
} from "chart.js";
// import { ChartOptions } from 'chart.js';

//internal imports
import Style from "./GameBoard.module.css";

interface GameBoardProps {
  speed: number;
  onGameEnd: (multiplier: number) => void;
  gameStarted: boolean;
}

// Chart Registration
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale,);


const GameBoard: React.FC<GameBoardProps> = ({ speed, onGameEnd, gameStarted }) => {
  const [multiplier, setMultiplier] = useState(0.0);
  const [targetMultiplier, setTargetMultiplier] = useState<number>(Math.random() * 10);

  useEffect(() => {
    if (gameStarted) {
      setTargetMultiplier(parseFloat((Math.random() * 10).toFixed(2)));
      setMultiplier(0.0); // Reset multiplier to 0 when game starts
    }
  }, [gameStarted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameStarted && multiplier < targetMultiplier) {
      interval = setInterval(() => {
        setMultiplier(prev => {
          const next = parseFloat((prev + 0.01 * speed).toFixed(2));
          if (next >= targetMultiplier) {
            clearInterval(interval);
            onGameEnd(next);
            return targetMultiplier;
          }
          return next;
        });
      }, 50 / speed);
    }

    return () => {
      clearInterval(interval);
    };
  }, [gameStarted, multiplier, targetMultiplier, speed, onGameEnd]);

  const data = {
    // labels: Array.from({ length: 101 }, (_, i) => (i / 10).toFixed(1)),
    // labels: Array.from({ length: Math.floor(multiplier * 10) + 1 }, (_, i) => (i / 10).toFixed(1)),
    labels: Array.from({ length: 11 }, (_, i) => i.toString()),
    datasets: [{
      label: 'Multiplier Progress',
      // data: Array.from({ length: Math.floor(multiplier * 10) + 1 }, (_, i) => (i / 10).toFixed(1)),
      // data: Array.from({ length: 11 }, (_, i) => multiplier <= i ? null : multiplier),
      // data: Array.from({ length: 11 }, (_, i) => (i <= Math.floor(multiplier)) ? multiplier : null),
      data: Array.from({ length: 11 }, (_, i) => (i / 10) <= multiplier ? parseFloat((multiplier * (i / 10)).toFixed(2)) : 0),

      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    }]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        // type:"category",
        // title: {
        //   display: true,
        //   // text: 'Time'
        // }
        suggestedMin: 0,
        suggestedMax: targetMultiplier,
      },
      y: {
        display: true,
        // type: 'linear',
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 0.01  
        },
      }
    },
    elements: {
      line: {
        tension: 0.3 // Smooth curve
      },
      point: {
        radius: 0 // Hide points
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
  };


  return (
    <div className={Style.gameBoard}>
      <div className={Style.grah}>
        <h1 className={Style.graph__multiplier}>{multiplier.toFixed(2)}x</h1>
        <Line className={Style.graph__line} data={data} options={options} />
      </div>
    </div>
  );
};

export default GameBoard;
