import React from 'react';

import PlayerInput from '../PlayerInput/PlayerInput';

//Internal imports
import Style from './App.module.css';


function App() {
  return (
    <div className={Style.App}>
     <PlayerInput/>
    </div>
  );
}

export default App;
