import React, { useState } from 'react';
import './buttonLanding.css';
import { useNavigate } from 'react-router-dom';

export default function ButtonLanding() {
  const [isAnimating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 750); 
    navigate('/home');
  };

  return (
    <button className={`btn ${isAnimating ? 'is-animating' : ''}`} onClick={handleClick}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="text">Vamos!</span>
    </button>
  );
}
