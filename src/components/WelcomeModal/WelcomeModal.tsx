import React, { useState } from 'react';

import Style from './WelcomeModal.module.css';
interface WelcomeModalProps {
  onAccept: (name: string) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onAccept }) => {
  const [name, setName] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && name.trim()) {
      handleAccept();
    }
  };

  const handleAccept = () => {
    if (name.trim()) {
      onAccept(name);
    }
  };

  return (
    <div className={Style.overlay} >
    <div className={Style.welcomeModal}>
      <h1 className={Style.welcomeModal__title} >Welcome</h1>
      <p>Please Insert Your Name</p>
      <input
      className={Style.welcome__input}
        type="text"
        value={name}
        onKeyDown={handleKeyPress}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
      />
      <button className={Style.welcome__submit}  onClick={handleAccept}>Accept</button>
    </div>
    </div>
  );
};

export default WelcomeModal;
