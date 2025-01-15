import React from 'react';
import defaultPoster from '../assets/default.png'; // Adjust the path as needed

function MovieList({ movies }) {
  return (
    <div className="container">
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3">
              <div className="card my-3">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : defaultPoster}
                  alt={movie.Title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;