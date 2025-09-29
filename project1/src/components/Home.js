import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import backgroundImage from '../assets/BG1.jpg'; // Import the background image

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="welcome-message">
        <h2>Welcome to Popcorn Tales!</h2>
        <p>Your ultimate destination for movies and TV shows</p>
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="nav-button movies-button"
          onClick={() => navigate('/movies')}
        >
          Movies
        </button>
        
        <button 
          className="nav-button tvshows-button"
          onClick={() => navigate('/tvshows')}
        >
          TV Shows
        </button>
      </div>
    </div>
  );
}

export default Home;