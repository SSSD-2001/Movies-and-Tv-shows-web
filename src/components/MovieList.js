/*
import React from 'react';
import defaultPoster from '../assets/garfield.jpg'; // Adjust the path as needed

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

export default MovieList;*/
import React from 'react';
import MovieCard from './MovieCard';
import defaultPoster from '../assets/garfield.jpg'; // Adjust the path as needed

function MovieList({ movies }) {
  const movieList = movies.filter(movie => movie.Type === 'movie');
  const tvShowList = movies.filter(movie => movie.Type === 'tvshow');

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Movies</h2>
          <div className="row">
            {movieList.length > 0 ? (
              movieList.map((movie) => (
                <div key={movie.imdbID} className="col-md-6">
                  <MovieCard
                    id={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster !== "N/A" ? movie.Poster : defaultPoster}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No movies found.</p>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <h2>TV Shows</h2>
          <div className="row">
            {tvShowList.length > 0 ? (
              tvShowList.map((tvshow) => (
                <div key={tvshow.imdbID} className="col-md-6">
                  <MovieCard
                    id={tvshow.imdbID}
                    title={tvshow.Title}
                    year={tvshow.Year}
                    poster={tvshow.Poster !== "N/A" ? tvshow.Poster : defaultPoster}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No TV shows found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;