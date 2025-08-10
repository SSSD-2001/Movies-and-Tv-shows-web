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

// Sample movie data (fallback)
const sampleMovies = [
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
    title: 'Chennai Express',
    year: '2013',
    type: 'movie',
    plot: 'A man travels to Tamil Nadu to immerse his grandfather\'s ashes.',
    directors: 'Rohit Shetty',
    genre: 'Action, Comedy, Romance',
    rating: '6.1',
    downloadLink: '#'
  },
  {
    _id: '3',
    title: 'It ends with us',
    year: '2024',
    type: 'movie',
    plot: 'A woman\'s relationship becomes complicated when her first love returns.',
    directors: 'Justin Baldoni',
    genre: 'Drama, Romance',
    rating: '6.5',
    downloadLink: '#'
  },
  {
    _id: '4',
    title: 'Moana',
    year: '2016',
    type: 'movie',
    plot: 'A spirited teenager sails out on a daring mission to save her people.',
    directors: 'Ron Clements, John Musker',
    genre: 'Animation, Adventure, Family',
    rating: '7.6',
    downloadLink: '#'
  },
  {
    _id: '5',
    title: 'Amaran',
    year: '2024',
    type: 'movie',
    plot: 'A biographical war drama.',
    directors: 'Rajkumar Periasamy',
    genre: 'Biography, Drama, War',
    rating: '8.2',
    downloadLink: '#'
  },
  {
    _id: '6',
    title: 'Breaking Bad',
    year: '2008-2013',
    type: 'tvshow',
    plot: 'A high school chemistry teacher turned methamphetamine manufacturer.',
    directors: 'Vince Gilligan',
    genre: 'Crime, Drama, Thriller',
    rating: '9.5',
    downloadLink: '#'
  },
  {
    _id: '7',
    title: 'Queen of Tears',
    year: '2024',
    type: 'tvshow',
    plot: 'A romantic drama about a couple navigating challenges.',
    directors: 'Jang Young-woo',
    genre: 'Romance, Drama',
    rating: '8.0',
    downloadLink: '#'
  },
  {
    _id: '8',
    title: 'Never Have I Ever',
    year: '2020-2023',
    type: 'tvshow',
    plot: 'A coming-of-age comedy-drama about an Indian-American teenager.',
    directors: 'Mindy Kaling',
    genre: 'Comedy, Drama',
    rating: '7.8',
    downloadLink: '#'
  }
];

// Routes
app.get('/', (req, res) => {
  res.send('Movies & TV Shows API Server - Connected to movies_app database');
});

// Get all movies with optional search
app.get('/api/movies', async (req, res) => {
  try {
    const { query } = req.query;
    let movies;
    
    try {
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
      
      // If no movies in database, use sample data
      if (movies.length === 0) {
        console.log('No movies found in database, using sample data');
        movies = sampleMovies;
        if (query) {
          movies = movies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.genre.toLowerCase().includes(query.toLowerCase()) ||
            movie.directors.toLowerCase().includes(query.toLowerCase())
          );
        }
      } else {
        console.log(`Found ${movies.length} movies in database`);
      }
    } catch (dbError) {
      console.log('Database error, using sample data:', dbError.message);
      movies = sampleMovies;
      if (query) {
        movies = movies.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.toLowerCase().includes(query.toLowerCase()) ||
          movie.directors.toLowerCase().includes(query.toLowerCase())
        );
      }
    }
    
    console.log(`Returning ${movies.length} movies`);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let movie;
    
    try {
      movie = await Movie.findById(id);
    } catch (dbError) {
      movie = sampleMovies.find(m => m._id === id);
    }
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    console.log(`Returning movie: ${movie.title}`);
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Internal server error' }); //test..
  }
});

// Add some movies to database (for testing)
app.post('/api/seed', async (req, res) => {
  try {
    await Movie.deleteMany({}); // Clear existing
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies added to database');
    res.json({ message: 'Sample movies added to database' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server also available on http://0.0.0.0:${PORT}`);
  console.log('Attempting to connect to movies_app database...');
});
