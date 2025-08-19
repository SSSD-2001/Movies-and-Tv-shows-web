import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieById, addToFavorites, addToCart } from '../services/api';
import { getPosterForTitle } from '../utils/posterMap';
import '../App.css';

// Import all poster images from assets
import defaultPoster from '../assets/garfield.jpg';
import wildRobotPoster from '../assets/wildrobot.jpg';
import chennaiExpressPoster from '../assets/chennaiexpress.jpg';
import itEndsWithUsPoster from '../assets/itendswithus.jpg';
import moanaPoster from '../assets/moana.jpg';
import amaranPoster from '../assets/amaran.jpg';
import garfieldPoster from '../assets/garfield.jpg';
import breakingBadPoster from '../assets/breakingbad.jpg';
import queenOfTearsPoster from '../assets/queenoftears.jpg';
import neverHaveIEverPoster from '../assets/neverhaveiever.jpg';
import ginnyGeorgiaPoster from '../assets/ginnygeorgia.jpg';
import mrPlanktonPoster from '../assets/mrplankton.jpg';
import summerPoster from '../assets/summer.jpg';

// Map of movie titles to their local poster images
const posterMap = {
  'Wild Robot': wildRobotPoster,
  'Chennai Express': chennaiExpressPoster,
  'It ends with us': itEndsWithUsPoster,
  'Moana': moanaPoster,
  'Amaran': amaranPoster,
  'Garfield': garfieldPoster,
  'Breaking Bad': breakingBadPoster,
  'Queen of Tears': queenOfTearsPoster,
  'Never have I ever': neverHaveIEverPoster,
  'Ginny & Georgia': ginnyGeorgiaPoster,
  'Mr.Plankton': mrPlanktonPoster,
  'The summer I turned pretty': summerPoster
};

function MovieDetails({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovieById(id);
        if (movieData) {
          setMovie({
            imdbID: movieData._id,
            Title: movieData.title,
            Year: movieData.year,
            Poster: (movieData.imageUrl && movieData.imageUrl.trim() !== '') 
              ? movieData.imageUrl 
              : getPosterForTitle(movieData.title),
            Type: movieData.type,
            Subtitles: movieData.subtitles,
            DownloadLink: movieData.downloadLink,
            Description: movieData.plot || 'No description available for this title.',
            Directors: movieData.directors || 'Unknown',
            Genre: movieData.genre || 'Unknown',
            Rating: movieData.rating || 'Not rated'
          });
        }
      } catch (err) {
        setError('Error loading movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!token) {
      alert('Please login to add to favorites');
      navigate('/login');
      return;
    }

    try {
      await addToFavorites(id, token);
      alert('Added to favorites successfully');
    } catch (error) {
      alert(error.message || 'Failed to add to favorites');
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      alert('Please login to add to cart');
      navigate('/login');
      return;
    }

    try {
      await addToCart(id, token);
      setAddedToCart(true);
      alert('Added to cart successfully');
    } catch (error) {
      alert(error.message || 'Failed to add to cart');
    }
  };

  if (loading) return <div className="text-center mt-5"><p>Loading...</p></div>;
  if (error) return <div className="text-center mt-5 text-danger"><p>{error}</p></div>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-details">
      <img 
        src={movie.Poster} 
        alt={movie.Title} 
        className="movie-poster"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://via.placeholder.com/300x450?text=${encodeURIComponent(movie.Title)}`;
        }}
      />
      
      <h2>{movie.Title}</h2>
      <p className="movie-description">{movie.plot}</p>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Directors:</strong> {movie.Directors}</p>
      <p><strong>Rating:</strong> {movie.Rating}</p>
      <p><strong>Type:</strong> {movie.Type === 'movie' ? 'Movie' : 'TV Show'}</p>
      <p><strong>Subtitles:</strong> {movie.Subtitles ? 'Available' : 'Not Available'}</p>
      
      <div className="button-group">
        <a href={movie.DownloadLink} className="nav-button download-btn">
          {movie.Type === 'movie' ? 'Download Movie' : 'Download TV Show'}
        </a>
        
        <button onClick={handleAddToFavorites} className="nav-button favorite-btn">
          Add to Favorites
        </button>
        
        <button 
          onClick={handleAddToCart} 
          className="nav-button cart-btn"
          disabled={addedToCart}
        >
          {addedToCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;