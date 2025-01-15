
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
export default MovieCard;