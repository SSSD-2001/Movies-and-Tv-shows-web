import React, { useState, useEffect } from 'react';
import { fetchMovies, createMovie, updateMovie, deleteMovie } from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    type: 'movie',
    plot: '',
    directors: '',
    genre: '',
    rating: '',
    downloadLink: ''
  });

  // Load movies on component mount
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
    } catch (error) {
      setMessage('Error loading movies: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (selectedMovie) {
        // Update existing movie
        const response = await updateMovie(selectedMovie._id, formData);
        setMessage(response.message);
      } else {
        // Create new movie
        const response = await createMovie(formData);
        setMessage(response.message);
      }
      
      // Reload movies and reset form
      await loadMovies();
      resetForm();
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title,
      year: movie.year,
      type: movie.type,
      plot: movie.plot,
      directors: movie.directors,
      genre: movie.genre,
      rating: movie.rating,
      downloadLink: movie.downloadLink
    });
    setShowForm(true);
  };

  const handleDelete = async (movieId, movieTitle) => {
    if (window.confirm(`Are you sure you want to delete "${movieTitle}"?`)) {
      setLoading(true);
      try {
        const response = await deleteMovie(movieId);
        setMessage(response.message);
        await loadMovies();
      } catch (error) {
        setMessage('Error deleting movie: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      year: '',
      type: 'movie',
      plot: '',
      directors: '',
      genre: '',
      rating: '',
      downloadLink: ''
    });
    setSelectedMovie(null);
    setShowForm(false);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel - Movie Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Movie/TV Show'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className="movie-form-container">
          <h2>{selectedMovie ? 'Edit Movie/TV Show' : 'Add New Movie/TV Show'}</h2>
          <form onSubmit={handleSubmit} className="movie-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year *</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max="2030"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Type *</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="movie">Movie</option>
                  <option value="tv">TV Show</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="directors">Directors</label>
              <input
                type="text"
                id="directors"
                name="directors"
                value={formData.directors}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="e.g., Action, Comedy, Drama"
              />
            </div>

            <div className="form-group">
              <label htmlFor="plot">Plot</label>
              <textarea
                id="plot"
                name="plot"
                value={formData.plot}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="downloadLink">Download Link</label>
              <input
                type="url"
                id="downloadLink"
                name="downloadLink"
                value={formData.downloadLink}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (selectedMovie ? 'Update' : 'Create')}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="movies-list">
        <h2>Manage Movies & TV Shows ({movies.length})</h2>
        {loading && <div className="loading">Loading...</div>}
        
        <div className="movies-table-container">
          <table className="movies-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Year</th>
                <th>Type</th>
                <th>Rating</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie._id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.year}</td>
                  <td>
                    <span className={`type-badge ${movie.type}`}>
                      {movie.type.toUpperCase()}
                    </span>
                  </td>
                  <td>{movie.rating}</td>
                  <td>{movie.genre}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(movie)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(movie._id, movie.title)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
