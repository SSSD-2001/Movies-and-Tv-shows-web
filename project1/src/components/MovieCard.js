import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ id, title, year, poster, description }) {
  console.log('MovieCard received:', { id, title, year, poster });

  // Use the provided poster URL or a placeholder
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = `https://via.placeholder.com/300x450?text=${encodeURIComponent(title)}`;
  };

  return (
    <div className="movie-card">
      <div className="card-poster">
        <img 
          src={poster} 
          alt={title} 
          className="movie-poster-image"
          onError={handleImageError} 
        />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="year">{year}</p>
        <Link to={`/movie/${id}`}>
          <button className="details-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;