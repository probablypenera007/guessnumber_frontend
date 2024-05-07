import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin, } from "gsap/MotionPathPlugin";
import { CustomEase } from "gsap/all";

import Style from "./GameBoard.module.css";

gsap.registerPlugin(MotionPathPlugin, CustomEase);

interface GameBoardProps {
  speed: number;
  onGameEnd: (multiplier: number) => void;
  gameStarted: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  speed,
  onGameEnd,
  gameStarted,
}) => {
  const pathRef = useRef<SVGSVGElement | null>(null);
  const ballRef = useRef<SVGCircleElement | null>(null);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);

  useEffect(() => {
    if (gameStarted && pathRef.current && ballRef.current) {
      const randomMultiplier = Math.random() * 10; // Random multiplier between 0.00 and 10.00
      const pathElement = pathRef.current.querySelector('path');
  
      gsap.set(ballRef.current, {
        scale: 2,
        autoAlpha: 1
      });
  
      if (pathElement) {
        // Initialize the motion path animation but pause it to manually control it later
        const pathAnimation = gsap.to(ballRef.current, {
          duration: speed,
          ease: "none",
          motionPath: {
            path: pathElement,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
          },
          paused: true
        });
  
        const multTracker = { multiplier: 0 };
        gsap.fromTo(multTracker, { multiplier: 0 }, {
          multiplier: randomMultiplier,
          duration: speed,
          ease: "none",
          onUpdate: function() {
            setCurrentMultiplier(multTracker.multiplier);
            pathAnimation.progress(multTracker.multiplier / 10);
            // Animate the stroke color of the path if the path element is still valid
            if (pathElement) {
              gsap.to(pathElement, {
                stroke: `rgb(${255 * (1 - multTracker.multiplier / 10)}, 99, 132)`,
                duration: 0.1 // quick color transition on update
              });
            }
          },
          onComplete: () => {
            onGameEnd(randomMultiplier);
            if (multTracker.multiplier < 10) {
              pathAnimation.progress(multTracker.multiplier / 10);
            }
          }
        });
  
        return () => {
          gsap.killTweensOf(ballRef.current);
          gsap.killTweensOf(multTracker);
        };
      }
    }
  }, [gameStarted, speed, onGameEnd]);
  
  

  return (
    <div className={Style.gameBoard}>
      <h1 className={Style.graph__multiplier}>
        {currentMultiplier.toFixed(2)}x
      </h1>
      <svg width="639" height="449" viewBox="10 0 550 200" ref={pathRef}>
        <path
          d="M-12.733,158.807 C-9.231,157.152 44.578,160.773 117.63,159.779 192.621,159.779 232.53,162.598 257.093,157.942 300.719,149.671 282.615,155.891 329.89,143.813 414.182,122.277 463.665,27.389 470.665,4.394"
          fill="transparent"
          stroke="rgb(255, 99, 132)"
          // stroke="transparent"
          strokeWidth="3"
        />
        <circle ref={ballRef} r="2" fill="yellow" />
      </svg>
      <div className={Style.lineContainer}>
        <div className={Style.baseLine}></div>
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `calc(${i * 10}% - ${i * 0.8}%)`,
              bottom: "-80px",
            }}
          >
            {i}
          </span>
        ))}
        {/* <div className={Style.ball} style={{ left: "0%" }}></div> */}
      </div>
    </div>
  );
};

export default GameBoard;
