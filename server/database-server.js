const express = require('express');
const app = express();           // only one app instance
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Admin email configuration - only these emails can be admins
const ADMIN_EMAILS = [
  'admin@popcorntales.com',
  'admin@gmail.com',
  'superadmin@popcorntales.com'
];

const isAdminEmail = (email) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

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
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user','admin'], default: 'user' },
  createdAt:{ type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Function to update existing users with admin roles (User is defined above)
const updateExistingAdminUsers = async () => {
  try {
    console.log('🔧 Checking for existing admin users to update...');
    
    const adminEmailUsers = await User.find({
      email: { $in: ADMIN_EMAILS },
      $or: [
        { role: { $ne: 'admin' } },
        { role: { $exists: false } }
      ]
    });
    
    if (adminEmailUsers.length > 0) {
      console.log(`Found ${adminEmailUsers.length} users with admin emails needing role update:`);
      for (const user of adminEmailUsers) {
        console.log(`- Updating ${user.username} (${user.email}) to admin role`);
        user.role = 'admin';
        await user.save();
      }
      console.log('✅ Successfully updated existing admin users');
    } else {
      console.log('✅ All admin users already have correct roles');
    }
  } catch (error) {
    console.error('❌ Error updating existing admin users:', error);
  }
};

// Fallback sample data
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

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movies_app';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB Connected to movies_app database');
  await updateExistingAdminUsers();
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  console.log('Please make sure MongoDB is running on port 27017');
  console.log('Falling back to sample data...');
});

// Routes
app.get('/', (req, res) => {
  res.send('Movies & TV Shows API Server - Connected to movies_app database');
});

app.get('/api/movies', async (req, res) => {
  try {
    const { query } = req.query;
    let movies;
    
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
    
    if (!movies || movies.length === 0) {
      console.log('Database empty or no match, using fallback data');
      movies = fallbackMovies;
      if (query) {
        movies = fallbackMovies.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          (movie.genre || '').toLowerCase().includes(query.toLowerCase()) ||
          (movie.directors || '').toLowerCase().includes(query.toLowerCase())
        );
      }
    }
    
    const transformedMovies = movies.map(movie => {
      let movieData;
      if (movie.toObject) movieData = movie.toObject();
      else movieData = JSON.parse(JSON.stringify(movie));
      if (movieData.type === 'tvshow') movieData.type = 'tv';
      if (movieData.poster && !movieData.imageUrl) movieData.imageUrl = movieData.poster;
      movieData.plot = movieData.plot || 'No plot available';
      movieData.directors = movieData.directors || 'Unknown';
      movieData.genre = movieData.genre || 'Unknown';
      movieData.rating = movieData.rating || '0.0';
      movieData.downloadLink = movieData.downloadLink || '#';
      movieData.imageUrl = movieData.imageUrl || '';
      return movieData;
    });
    
    res.json(transformedMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid movie ID format' });
    }
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// CREATE
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, type, plot, directors, genre, rating, downloadLink, imageUrl } = req.body;
    if (!title || !year || !type) return res.status(400).json({ error: 'Title, year, and type are required' });
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
    const savedMovie = await newMovie.save();
    res.status(201).json({ message: `${type} added successfully to MongoDB`, movie: savedMovie });
  } catch (error) {
    console.error('CREATE MOVIE ERROR:', error);
    res.status(500).json({ error: 'Failed to create movie: ' + error.message });
  }
});

// UPDATE
app.put('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid movie ID format' });
    const updatedMovie = await Movie.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });
    if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie updated successfully in MongoDB', movie: updatedMovie });
  } catch (error) {
    console.error('UPDATE MOVIE ERROR:', error);
    res.status(500).json({ error: 'Failed to update movie: ' + error.message });
  }
});

// DELETE
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid movie ID format' });
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully from MongoDB', movie: deletedMovie });
  } catch (error) {
    console.error('DELETE MOVIE ERROR:', error);
    res.status(500).json({ error: 'Failed to delete movie: ' + error.message });
  }
});

// AUTH - Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Username, email, and password are required' });
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ error: 'Username or email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const role = isAdminEmail(email) ? 'admin' : 'user';
    const newUser = new User({ username, email: email.toLowerCase().trim(), password: hashed, role });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET || 'CHANGE_THIS', { expiresIn: '7d' });
    res.status(201).json({ message: 'Registration successful', user: { username: savedUser.username, email: savedUser.email, id: savedUser._id, role: savedUser.role }, token });
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    if (error.code === 11000) return res.status(400).json({ error: 'Username or email already exists' });
    res.status(500).json({ error: 'Registration failed: ' + error.message });
  }
});

// AUTH - Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'CHANGE_THIS', { expiresIn: '7d' });
    res.json({ message: 'Login successful', user: { username: user.username, email: user.email, id: user._id, role: user.role }, token });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ error: 'Login failed: ' + error.message });
  }
});

// Verify admin
app.post('/api/auth/verify-admin', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    res.json({ isAdmin: isAdminEmail(email) });
  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Cart endpoints (demo)
app.post('/api/cart/:movieId', (req, res) => {
  res.json({ message: 'Movie added to cart (demo)', movieId: req.params.movieId });
});
app.delete('/api/cart/:movieId', (req, res) => {
  res.json({ message: 'Movie removed from cart (demo)', movieId: req.params.movieId });
});
app.get('/api/cart', (req, res) => {
  res.json({ message: 'Cart retrieved (demo)', items: [], total: 0 });
});

// Debug users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Attempting to connect to movies_app database...');
});
