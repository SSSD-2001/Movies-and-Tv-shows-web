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
          // Sample descriptions based on title - in a real app, this would come from your backend
          const descriptions = {
            'Wild Robot': 'A robot named Roz is shipwrecked on an island and learns to adapt to the environment while raising an orphaned gosling.',
            'Chennai Express': 'A mans journey from Mumbai to Rameshwaram and what happens along the way when he falls in love with the daughter of a local don.',
            'It ends with us': 'A heartbreaking story about breaking the cycle of abuse and making difficult choices for a better future.',
            'Moana': 'An adventurous teenager sails out on a daring mission to save her people and discover the truth about her heritage.',
            'Amaran': 'The story of a brave soldier who sacrifices everything to protect his country.',
            'Breaking Bad': 'A high school chemistry teacher diagnosed with cancer turns to manufacturing methamphetamine to secure his familys financial future.',
            'Queen of Tears': 'A romantic drama about a couple navigating the challenges of marriage and the complexities of life.',
            'Ginny & Georgia': 'A mother-daughter relationship drama with plenty of secrets and complicated relationships.'
          };

          setMovie({
            imdbID: movieData._id,
            Title: movieData.title,
            Year: movieData.year,
            Poster: getPosterForTitle(movieData.title),
            Type: movieData.type,
            Subtitles: movieData.subtitles,
            DownloadLink: movieData.downloadLink,
            Description: descriptions[movieData.title] || 'No description available for this title.'
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
      <p className="movie-description">{movie.Description}</p>
      <p>Year: {movie.Year}</p>
      <p>Subtitles: {movie.Subtitles}</p>
      
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