import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

function TVShows({ movies, loading, error, onSearch }) {
  const navigate = useNavigate();
  const tvShowsList = movies.filter(movie => movie.Type === 'tv');

  return (
    <div className="tvshows-container">
      <div className="category-header">
        <h2 className="page-title">TV Shows</h2>
      </div>

      {/* Add SearchBar for TV Shows */}
      <SearchBar onSearch={onSearch} />

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

      {/* Navigation buttons moved to bottom right */}
      <div className="page-nav-buttons">
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
  );
}

export default TVShows;