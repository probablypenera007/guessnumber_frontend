import React from 'react';

import PlayerInput from '../PlayerInput/PlayerInput';
import CurrentRound from '../CurrentRound/CurrentRound';

//Internal imports
import Style from './App.module.css';



const handleSubmit = (points: number, multiplier: number) => {
  console.log("Points:", points, "Multiplier:", multiplier);
};

function App() {
  return (
    <div className={Style.App}>
     <PlayerInput
     onSubmit={handleSubmit}
     />
     <CurrentRound/>
    </div>
  );
}

export default App;
