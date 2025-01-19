/*
import React from 'react';

function MovieCard({ title, year, poster }) {
  return (
    <div className="card">
      <img src={poster} alt={title} />
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  );
};
export default MovieCard;*/

import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ id, title, year, poster }) {
  return (
    <div className="card">
      <img src={poster} alt={title} />
      <h3>{title}</h3>
      <p>{year}</p>
      <Link to={`/movie/${id}`}>
      <button className="btn btn-more-details">More Details</button>
      </Link>
    </div>
  );
}

export default MovieCard;