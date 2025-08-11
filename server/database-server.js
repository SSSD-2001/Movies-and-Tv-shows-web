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

// Authentication endpoints (simple implementation)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    
    // For demo purposes, just return success
    // In production, you'd hash the password and save to database
    console.log(`Registration attempt: ${username}, ${email}`);
    
    res.json({ 
      message: 'Registration successful',
      user: { username, email },
      token: 'demo-token-' + Date.now() // Simple token for demo
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // For demo purposes, accept any login
    // In production, you'd verify against database
    console.log(`Login attempt: ${username}`);
    
    res.json({
      message: 'Login successful',
      user: { username },
      token: 'demo-token-' + Date.now() // Simple token for demo
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Cart endpoints (simple implementation)
app.post('/api/cart/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    
    // For demo purposes, just return success
    // In production, you'd save to user's cart in database
    console.log(`Added movie ${movieId} to cart`);
    
    res.json({
      message: 'Movie added to cart successfully',
      movieId: movieId,
      cartId: 'cart-' + Date.now()
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.delete('/api/cart/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    
    // For demo purposes, just return success
    console.log(`Removed movie ${movieId} from cart`);
    
    res.json({
      message: 'Movie removed from cart successfully',
      movieId: movieId
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    
    // For demo purposes, return empty cart
    // In production, you'd fetch user's cart from database
    console.log('Fetching user cart');
    
    res.json({
      message: 'Cart retrieved successfully',
      items: [], // Empty cart for demo
      total: 0
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to get cart' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server also available on http://0.0.0.0:${PORT}`);
  console.log('Attempting to connect to movies_app database...');
});
