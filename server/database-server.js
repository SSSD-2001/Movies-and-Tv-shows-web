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

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Fallback sample data (includes both movies and TV shows)
const fallbackMovies = [
  {
    _id: '1',
    title: 'Wild Robot',
    year: '2024',
    type: 'movie',
    plot: 'An animated adventure about a robot stranded on an island.',
    directors: 'Chris Sanders',
    genre: 'Animation, Adventure, Family',
    rating: '8.0',
    downloadLink: '#'
  },
  {
    _id: '2',
    title: 'Breaking Bad',
    year: '2008-2013',
    type: 'tvshow',
    plot: 'A high school chemistry teacher turned methamphetamine producer.',
    directors: 'Vince Gilligan',
    genre: 'Crime, Drama, Thriller',
    rating: '9.5',
    downloadLink: '#'
  },
  {
    _id: '3',
    title: 'Stranger Things',
    year: '2016-2025',
    type: 'tvshow',
    plot: 'Supernatural events in the small town of Hawkins, Indiana.',
    directors: 'The Duffer Brothers',
    genre: 'Drama, Fantasy, Horror',
    rating: '8.7',
    downloadLink: '#'
  },
  {
    _id: '4',
    title: 'The Crown',
    year: '2016-2023',
    type: 'tvshow',
    plot: 'The reign of Queen Elizabeth II from the 1940s to modern times.',
    directors: 'Peter Morgan',
    genre: 'Biography, Drama, History',
    rating: '8.6',
    downloadLink: '#'
  },
  {
    _id: '5',
    title: 'Chennai Express',
    year: '2013',
    type: 'movie',
    plot: 'A man travels to Tamil Nadu to immerse his grandfather\'s ashes.',
    directors: 'Rohit Shetty',
    genre: 'Action, Comedy, Romance',
    rating: '6.1',
    downloadLink: '#'
  }
];

// Database-first approach with fallback data

// Routes
app.get('/', (req, res) => {
  res.send('Movies & TV Shows API Server - Connected to movies_app database');
});

// Get all movies with optional search
app.get('/api/movies', async (req, res) => {
  try {
    const { query } = req.query;
    let movies;
    
    // Try to get from database first
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
    
    // If database is empty, use fallback data
    if (movies.length === 0) {
      console.log('Database empty, using fallback data');
      movies = fallbackMovies;
      if (query) {
        movies = fallbackMovies.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.toLowerCase().includes(query.toLowerCase()) ||
          movie.directors.toLowerCase().includes(query.toLowerCase())
        );
      }
    }
    
    // Transform data to match frontend expectations (convert 'tvshow' to 'tv')
    const transformedMovies = movies.map(movie => {
      // Create a copy of the movie object
      let movieData;
      if (movie.toObject) {
        movieData = movie.toObject();
      } else {
        movieData = JSON.parse(JSON.stringify(movie));
      }
      
      // Transform tvshow to tv for frontend compatibility
      if (movieData.type === 'tvshow') {
        movieData.type = 'tv';
      }
      
      return movieData;
    });
    
    console.log(`Returning ${transformedMovies.length} items (${transformedMovies.filter(m => m.type === 'movie').length} movies, ${transformedMovies.filter(m => m.type === 'tv').length} TV shows)`);
    res.json(transformedMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Looking for movie with ID: ${id}`);
    
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ObjectId format: ${id}`);
      return res.status(400).json({ error: 'Invalid movie ID format' });
    }
    
    const movie = await Movie.findById(id);
    
    if (!movie) {
      console.log(`Movie not found with ID: ${id}`);
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    console.log(`Returning movie: ${movie.title}`);
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// ===== CRUD OPERATIONS FOR MOVIES/TV SHOWS =====

// CREATE - Add new movie/TV show
app.post('/api/movies', async (req, res) => {
  try {
    console.log('=== CREATE MOVIE REQUEST ===');
    console.log('Request body:', req.body);
    
    const { title, year, type, plot, directors, genre, rating, downloadLink, imageUrl } = req.body;
    
    // Basic validation
    if (!title || !year || !type) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({ error: 'Title, year, and type are required' });
    }
    
    console.log(`Creating new ${type}: ${title}`);
    
    // Create new movie/TV show object
    const newMovie = new Movie({
      title: title.trim(),
      year: year.toString(),
      type: type.toLowerCase(),
      plot: plot || 'No plot available',
      directors: directors || 'Unknown',
      genre: genre || 'Unknown',
      rating: rating || '0.0',
      downloadLink: downloadLink || '#',
      imageUrl: imageUrl || ''
    });
    
    // Save to MongoDB
    const savedMovie = await newMovie.save();
    
    console.log(`✅ ${type.toUpperCase()} SUCCESSFULLY SAVED TO MONGODB!`);
    console.log(`Movie ID: ${savedMovie._id}`);
    console.log(`Title: ${savedMovie.title}`);
    
    res.status(201).json({
      message: `${type} added successfully to MongoDB`,
      movie: savedMovie
    });
  } catch (error) {
    console.error('❌ CREATE MOVIE ERROR:', error);
    res.status(500).json({ error: 'Failed to create movie: ' + error.message });
  }
});

// UPDATE - Update existing movie/TV show
app.put('/api/movies/:id', async (req, res) => {
  try {
    console.log('=== UPDATE MOVIE REQUEST ===');
    console.log('Movie ID:', req.params.id);
    console.log('Update data:', req.body);
    
    const { id } = req.params;
    
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ObjectId format: ${id}`);
      return res.status(400).json({ error: 'Invalid movie ID format' });
    }
    
    // Update movie in MongoDB
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!updatedMovie) {
      console.log(`Movie not found with ID: ${id}`);
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    console.log(`✅ MOVIE SUCCESSFULLY UPDATED IN MONGODB!`);
    console.log(`Updated: ${updatedMovie.title}`);
    
    res.json({
      message: 'Movie updated successfully in MongoDB',
      movie: updatedMovie
    });
  } catch (error) {
    console.error('❌ UPDATE MOVIE ERROR:', error);
    res.status(500).json({ error: 'Failed to update movie: ' + error.message });
  }
});

// DELETE - Delete movie/TV show
app.delete('/api/movies/:id', async (req, res) => {
  try {
    console.log('=== DELETE MOVIE REQUEST ===');
    console.log('Movie ID:', req.params.id);
    
    const { id } = req.params;
    
    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid ObjectId format: ${id}`);
      return res.status(400).json({ error: 'Invalid movie ID format' });
    }
    
    // Delete movie from MongoDB
    const deletedMovie = await Movie.findByIdAndDelete(id);
    
    if (!deletedMovie) {
      console.log(`Movie not found with ID: ${id}`);
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    console.log(`✅ MOVIE SUCCESSFULLY DELETED FROM MONGODB!`);
    console.log(`Deleted: ${deletedMovie.title}`);
    
    res.json({
      message: 'Movie deleted successfully from MongoDB',
      movie: deletedMovie
    });
  } catch (error) {
    console.error('❌ DELETE MOVIE ERROR:', error);
    res.status(500).json({ error: 'Failed to delete movie: ' + error.message });
  }
});

// Authentication endpoints (with MongoDB saving)
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('=== REGISTRATION REQUEST ===');
    console.log('Request body:', req.body);
    const { username, email, password } = req.body;
    
    // Simple validation
    if (!username || !email || !password) {
      console.log('Validation failed: missing fields');
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    
    console.log(`Attempting to register user: ${username} with email: ${email}`);
    
    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ 
      $or: [{ username: username }, { email: email }] 
    });
    
    if (existingUser) {
      console.log('User already exists:', existingUser.username);
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    console.log('No existing user found, creating new user...');
    
    // Create new user (in production, hash the password first)
    const newUser = new User({
      username: username,
      email: email,
      password: password // Note: In production, hash this with bcrypt
    });
    
    console.log('User object created, attempting to save to MongoDB...');
    
    // Save user to MongoDB
    const savedUser = await newUser.save();
    
    console.log(`✅ USER SUCCESSFULLY SAVED TO MONGODB!`);
    console.log(`User ID: ${savedUser._id}`);
    console.log(`Username: ${savedUser.username}`);
    console.log(`Email: ${savedUser.email}`);
    console.log(`Created at: ${savedUser.createdAt}`);
    
    res.status(201).json({ 
      message: 'Registration successful - User saved to MongoDB',
      user: { username, email, id: savedUser._id },
      token: 'demo-token-' + Date.now()
    });
  } catch (error) {
    console.error('❌ REGISTRATION ERROR:', error);
    console.error('Error details:', error.message);
    
    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    
    res.status(500).json({ error: 'Registration failed: ' + error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST ===');
    console.log('Request body:', req.body);
    const { username, password } = req.body;
    
    // Simple validation
    if (!username || !password) {
      console.log('Login failed: missing username or password');
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    console.log(`Attempting to login user: ${username}`);
    
    // Find user in MongoDB database
    const user = await User.findOne({ username: username });
    
    if (!user) {
      console.log(`❌ LOGIN FAILED: User '${username}' not found in database`);
      return res.status(401).json({ error: 'Invalid username or password. Please register first.' });
    }
    
    console.log(`✅ User found in database: ${user.username} (${user.email})`);
    
    // Verify password (in production, use bcrypt to compare hashed passwords)
    if (user.password !== password) {
      console.log(`❌ LOGIN FAILED: Incorrect password for user '${username}'`);
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    console.log(`✅ LOGIN SUCCESSFUL: ${username} authenticated from MongoDB database`);
    
    res.json({
      message: 'Login successful - User verified from MongoDB',
      user: { username: user.username, email: user.email, id: user._id },
      token: 'auth-token-' + Date.now() // Simple token for demo
    });
  } catch (error) {
    console.error('❌ LOGIN ERROR:', error);
    res.status(500).json({ error: 'Login failed: ' + error.message });
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

// Debug endpoint to view all registered users (remove in production)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    console.log(`Found ${users.length} users in database`);
    res.json({
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
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
