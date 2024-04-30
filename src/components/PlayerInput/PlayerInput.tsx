import React from "react";

//Internal imports
import Style from "./PlayerInput.module.css";

const PlayerInput = () => {
  return (
    <div className={Style.playerInput}>
      <div className={Style.playerInput__container}>
        <div className={Style.playerInput__points}>
          <button className={Style.playerInput__points_down}></button>
          <input type="number" className={Style.playerInput__points_input} />
          <button className={Style.playerInput__points_up}></button>
        </div>
        <div className={Style.playerInput__multiplier}>
          <button className={Style.playerInput__multiplier_down}></button>
          <input
            type="number"
            className={Style.playerInput__multiplier_input}
          />
          <button className={Style.playerInput__multipilier_up}></button>
        </div>
      </div>
      <button className={Style.playerInput__submit}>START</button>
    </div>
  );
};

export default PlayerInput;
