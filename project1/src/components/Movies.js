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
        <h2>- Movies -</h2>
        
        <div className="category-nav">
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

      

      {loading ? (
        <p className="text-center">Loading movies...</p>
      ) : error ? (
        <p className="error-message text-center">{error}</p>
      ) : moviesList.length === 0 ? (
        <p className="text-center">No movies available</p>
      ) : (
        <MovieList movies={moviesList} />
      )}
    </div>
  );
}

export default Movies;