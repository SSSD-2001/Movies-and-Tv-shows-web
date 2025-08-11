import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

function TVShows({ movies, loading, error, onSearch }) {
  const navigate = useNavigate();
  const tvShowsList = movies.filter(movie => movie.Type === 'tvshow');

  return (
    <div className="tvshows-container">
      <div className="category-header">
        <h2>- TV Shows -</h2>
        
        <div className="category-nav">
          <button 
            className="nav-button"
            onClick={() => navigate('/movies')}
          >
            Movies
          </button>
          
          <button 
            className="nav-button active"
            disabled
          >
            TV Shows
          </button>
        </div>
      </div>

      {/* Add SearchBar here */}
      

      {/* Rest of component remains the same */}
      {loading ? (
        <p className="text-center">Loading TV shows...</p>
      ) : error ? (
        <p className="error-message text-center">{error}</p>
      ) : tvShowsList.length === 0 ? (
        <p className="text-center">No TV shows available</p>
      ) : (
        <MovieList movies={tvShowsList} />
      )}
    </div>
  );
}

export default TVShows;