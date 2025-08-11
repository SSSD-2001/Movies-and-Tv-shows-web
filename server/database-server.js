const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection - using your database name (force IPv4)
mongoose.connect('mongodb://127.0.0.1:27017/movies_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected to movies_app database');
  console.log('Database URL: mongodb://localhost:27017/movies_app');
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  console.log('Please make sure MongoDB is running on port 27017');
  console.log('Falling back to sample data...');
});

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  type: String,
  plot: String,
  directors: String,
  genre: String,
  rating: String,
  downloadLink: String,
  poster: String,
  subtitles: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Database-only approach - no hardcoded data

// Routes
app.get('/', (req, res) => {
  res.send('Movies & TV Shows API Server - Connected to movies_app database');
});

// Get all movies with optional search
app.get('/api/movies', async (req, res) => {
  try {
    const { query } = req.query;
    let movies;
    
    // Get from database only
    if (query) {
      movies = await Movie.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } },
          { directors: { $regex: query, $options: 'i' } }
        ]
      });
    } else {
      movies = await Movie.find();
    }
    
    console.log(`Found ${movies.length} movies in database`);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    console.log(`Returning movie: ${movie.title}`);
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Seed endpoint removed - add movies through database directly

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server also available on http://0.0.0.0:${PORT}`);
  console.log('Attempting to connect to movies_app database...');
});
