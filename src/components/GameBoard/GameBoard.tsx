import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import Style from './GameBoard.module.css';

gsap.registerPlugin(MotionPathPlugin);

interface GameBoardProps {
  speed: number;
  onGameEnd: (multiplier: number) => void;
  gameStarted: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ speed, onGameEnd, gameStarted }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const ballRef = useRef<SVGCircleElement | null>(null);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);
  const targetMultiplier = useRef<number>(Math.random() * 10);

  useEffect(() => {
    if (gameStarted) {
      const newTarget = parseFloat((Math.random() * 10).toFixed(2));
      targetMultiplier.current = newTarget;
      setCurrentMultiplier(0); // Reset the multiplier display at start

      if (pathRef.current && ballRef.current) {
        // Set initial state with GSAP
        gsap.set(ballRef.current, {
          motionPath: {
            path: pathRef.current,
            start: 0,
            end: 0
          }
        });

        // Animate to end state
        gsap.to(ballRef.current, {
          motionPath: {
            path: pathRef.current,
            start: 0,
            end: (targetMultiplier.current / 10)
          },
          duration: speed,
          ease: 'none',
          onUpdate: () => {
            const pathProperties = gsap.getProperty(ballRef.current, "motionPath") as any; // Cast as any to access custom properties
            const progress = pathProperties.end * 10;
            setCurrentMultiplier(progress);
          },
          onComplete: () => onGameEnd(targetMultiplier.current)
        });
      }
    }
  }, [gameStarted, speed, onGameEnd]);

  return (
    <div className={Style.gameBoard}>
      <h1 className={Style.graph__multiplier} >{currentMultiplier.toFixed(2)}x</h1>
      <svg width="100%" height="200" viewBox="0 0 100 100">
        <path
          ref={pathRef}
          d="M01,90 L90,90"
          fill="transparent"
          stroke="rgb(255, 99, 132)"
          strokeWidth="2"
        />
        <circle ref={ballRef} cx="10" cy="90" r="3" fill="yellow" />
      </svg>
      
    </div>
  );
};

export default GameBoard;
