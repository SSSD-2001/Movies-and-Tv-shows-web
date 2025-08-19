import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from './MovieList';
import SearchBar from './SearchBar';


function Movies({ movies, loading, error, onSearch }) {
  const navigate = useNavigate();
  const moviesList = movies.filter(movie => movie.Type === 'movie');

  return (
    <div className="movies-container" >
      <div className="category-header" >
        <h2 className="page-title">Movies</h2>
      </div>

      {/* Add SearchBar for Movies */}
      <SearchBar onSearch={onSearch} />

      {loading ? (
        <p className="text-center">Loading movies...</p>
      ) : error ? (
        <p className="error-message text-center">{error}</p>
      ) : moviesList.length === 0 ? (
        <p className="text-center">No movies available</p>
      ) : (
        <MovieList movies={moviesList} />
      )}

      {/* Navigation buttons moved to bottom right */}
      <div className="page-nav-buttons">
        <button 
          className="nav-button active"
          disabled>
          Movies
        </button>
        
        <button 
          className="nav-button"
          onClick={() => navigate('/tvshows')}>
          TV Shows
        </button>
      </div>
    </div>
  );
}

export default Movies;