import React from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//Internal imports
import Style from "./PlayerInput.module.css";

const PlayerInput = () => {
  return (
    <div className={Style.playerInput}>
      <div className={Style.playerInput__container}>
        <div className={Style.playerInput__points}>
          <button className={Style.playerInput__points_down}>
            <TiArrowSortedDown className={Style.icon} />
          </button>
          <p className={Style.playerInput__point_text}>Points</p>
          <input type="number" placeholder="50" className={Style.playerInput__points_input} disabled/>
          <button className={Style.playerInput__points_up}>
            <TiArrowSortedUp className={Style.icon} />
          </button>
        </div>

        <div className={Style.playerInput__multiplier}>
          <button className={Style.playerInput__multiplier_down}>
            <TiArrowSortedDown className={Style.icon} />
          </button>
          <p className={Style.playerInput__multiplier_text}>Multiplier</p>
          <input
            type="number"
            placeholder="0.5"
            className={Style.playerInput__multiplier_input}
            disabled
          />

          <button className={Style.playerInput__multipilier_up}>
            <TiArrowSortedUp className={Style.icon} />
          </button>
        </div>
      </div>
      <button className={Style.playerInput__submit}>START</button>
    </div>
  );
};

export default PlayerInput;
