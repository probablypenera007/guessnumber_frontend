import React, { useEffect, useState, useRef, useContext } from 'react';
import { cpuMessages } from '../../utils/cpuPlayers';
import Logo from '../../images/img-index';
import CurrentUserContext from '../../contexts/CurrentUserContext';  // Adjust the import path as necessary

// Internal imports
import Style from './ChatBox.module.css';

interface Message {
  sender: string;
  text: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = useContext(CurrentUserContext); 

  useEffect(() => {
    if (currentUser) {
      const intervalId = setInterval(() => {
        const randomMessage = cpuMessages[Math.floor(Math.random() * cpuMessages.length)];
        setMessages(prevMessages => [...prevMessages, randomMessage]);
      }, 5000); //5 seconds

      return () => clearInterval(intervalId);
    }
  }, [currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input.trim()) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <div className={Style.chatBox}>
      <h2 className={Style.chatBox__title}>
        <img className={Style.chatLogo} src={Logo.chatLogo} alt="Chat logo" /> 
        Chat
      </h2>
      <div className={Style.messages}>
        {messages.map((message, index) => (
          <div key={index} className={Style.message}>
            <strong className={Style.chat__sender}>{message.sender}:</strong> {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={Style.inputArea}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className={Style.input}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className={Style.sendButton}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
