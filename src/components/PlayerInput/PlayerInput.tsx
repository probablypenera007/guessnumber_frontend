import React from "react";
import {TiArrowSortedDown, TiArrowSortedUp} from "react-icons/ti";

//Internal imports
import Style from "./PlayerInput.module.css";

const PlayerInput = () => {
  return (
    <div className={Style.playerInput}>
      <div className={Style.playerInput__container}>
        <div className={Style.playerInput__points}>
          <button className={Style.playerInput__points_down}>
            <TiArrowSortedDown />
          </button>
          <p className={Style.playerInput__point_text}>Points</p>
          <input type="number" className={Style.playerInput__points_input} />
          <button className={Style.playerInput__points_up}>
            <TiArrowSortedUp />
          </button>
        </div>
        <div className={Style.playerInput__multiplier}>
          <button className={Style.playerInput__multiplier_down}>
            <TiArrowSortedDown/>
          </button>
          <p className={Style.playerInput__multiplier_text}>Multiplier</p>
          <input
            type="number"
            className={Style.playerInput__multiplier_input}
          />

          <button className={Style.playerInput__multipilier_up}>
            <TiArrowSortedUp/>
          </button>
        </div>
      </div>
      <button className={Style.playerInput__submit}>START</button>
    </div>
  );
};

export default PlayerInput;
