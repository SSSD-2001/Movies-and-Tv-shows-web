import React from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css'; // Make sure to create this file
import MovieCard from './MovieCard'; // Import the MovieCard component

function MovieList({ movies, title }) {
  console.log('MovieList received:', { movies, title });

  if (!movies || movies.length === 0) {
    return <div className="container mt-4 text-center">No {title.toLowerCase()} available.</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{title}</h2>
      <div className="row">
        {movies.map(movie => (
          <div key={movie.imdbID} className="col-md-3 mb-4">
            <MovieCard
              id={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
              description={movie.Plot}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;