import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ id, title, year, poster, description }) {
  console.log('MovieCard received:', { id, title, year, poster });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use the provided poster URL or a placeholder
  const handleImageError = (e) => {
    console.log(`Image failed to load for: ${title}`);
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const placeholderUrl = `https://via.placeholder.com/300x450/2c3e50/ffffff?text=${encodeURIComponent(title.replace(/\s+/g, '+'))}`;

  return (
    <div className="movie-card">
      <div className="card-poster">
        {!imageLoaded && (
          <div className="no-image">Loading...</div>
        )}
        {imageError ? (
          <div className="no-image">{title}</div>
        ) : (
          <img 
            src={poster || placeholderUrl} 
            alt={title} 
            className="movie-poster-image"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onError={handleImageError} 
            onLoad={handleImageLoad}
          />
        )}
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