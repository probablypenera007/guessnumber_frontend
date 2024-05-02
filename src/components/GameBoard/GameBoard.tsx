import React, { useEffect, useRef } from 'react';
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
  const targetMultiplier = useRef<number>(Math.random() * 10);

  useEffect(() => {
    if (gameStarted) {
      const newTarget = parseFloat((Math.random() * 10).toFixed(2));
      targetMultiplier.current = newTarget;

     
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
            end: 1
          },
          duration: speed,
          ease: 'none',
          onComplete: () => onGameEnd(targetMultiplier.current)
        });
      }
    }
  }, [gameStarted, speed, onGameEnd]);

  return (
    <div className={Style.gameBoard}>
      <svg width="100%" height="200" viewBox="0 0 100 100">
        <path
          ref={pathRef}
          d={`M10,${100 - targetMultiplier.current * 9} L90,${100 - targetMultiplier.current * 9}`}
          fill="transparent"
          stroke="rgb(255, 99, 132)"
          strokeWidth="2"
        />
        <circle ref={ballRef} cx="0" cy="0" r="3" fill="yellow" />
      </svg>
      <div>Target Multiplier: {targetMultiplier.current.toFixed(2)}</div>
    </div>
  );
};

export default GameBoard;
