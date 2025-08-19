import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import Movies from './components/Movies';
import TVShows from './components/TVShows';
import AdminPanel from './components/AdminPanel';
import { fetchMovies } from './services/api';
import Cart from './components/Cart';
import { getPosterForTitle } from './utils/posterMap'; // Import at top level

import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    // Load movies when component mounts
    loadMovies();
  }, []);

  const loadMovies = async (query = '') => {
    setLoading(true);
    try {
      const data = await fetchMovies(query);
      console.log('API Response:', data); // For debugging
      
      if (data && Array.isArray(data)) {
        // Transform the data to match our frontend structure
        const formattedMovies = data.map(movie => {
          // Use imageUrl if available and not empty, otherwise fallback to local poster mapping
          const posterUrl = (movie.imageUrl && movie.imageUrl.trim() !== '') 
            ? movie.imageUrl 
            : getPosterForTitle(movie.title);
          
          return {
            imdbID: movie._id,
            Title: movie.title,
            Year: movie.year,
            Type: movie.type,
            Poster: posterUrl,
            Plot: movie.plot,
            Director: movie.directors,  // or director if you rename it
            Genre: movie.genre,
            Rating: movie.rating,
            DownloadLink: movie.downloadLink
          };
        });
        
        setMovies(formattedMovies);
        setError(null);
      } else {
        console.error('Invalid data format received:', data);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      setError('Failed to fetch movies');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    loadMovies(query);
  };

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
  };

  // Filter movies and TV shows
  const moviesList = movies.filter(item => item.Type === 'movie');
  const tvShowsList = movies.filter(item => item.Type === 'tv');

  return (
    <Router>
      <div>
        <h1 className="title">
          🍿 Popcorn Tales 🍿
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={handleLogout} />
        </h1>
        
        {loading && <div className="text-center mt-5"><p>Loading...</p></div>}
        {error && <div className="text-center mt-5 text-danger"><p>{error}</p></div>}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies movies={moviesList} loading={loading} error={error} onSearch={handleSearch} />} />
          <Route path="/tvshows" element={<TVShows movies={tvShowsList} loading={loading} error={error} onSearch={handleSearch} />} />
          <Route path="/movie/:id" element={<MovieDetails token={token} />} />
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart token={token} />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/debug" element={
            <div className="container mt-5">
              <h2>Debug Data</h2>
              {loading ? <p>Loading...</p> : (
                <>
                  <p>Movies loaded: {movies.length}</p>
                  <pre className="bg-light p-3">
                    {JSON.stringify(movies, null, 2)}
                  </pre>
                </>
              )}
            </div>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;