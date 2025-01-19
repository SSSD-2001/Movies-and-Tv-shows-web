import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetails({ movies }) {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.imdbID === id);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <h2>{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Subtitles: English {movie.Subtitles}</p>
      <a href={movie.DownloadLink} download>
        <button>
          {movie.Type === 'movie' ? 'Download Movie' : 'Download TV Show'}
        </button>
      </a>
    </div>
  );
}

export default MovieDetails;