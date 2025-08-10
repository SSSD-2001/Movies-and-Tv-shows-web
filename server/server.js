const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  console.log('Please make sure MongoDB is running on port 27017');
  console.log('Using sample data instead');
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
  downloadLink: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Sample movie data
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
    genre: 'Animation, Adventure, Comedy',
    rating: '7.6',
    downloadLink: '#'
  },
  {
    _id: '5',
    title: 'Amaran',
    year: '2024',
    type: 'movie',
    plot: 'A biographical war drama about an Indian army officer.',
    directors: 'Rajkumar Periasamy',
    genre: 'Biography, Drama, War',
    rating: '8.2',
    downloadLink: '#'
  },
  {
    _id: '6',
    title: 'Garfield',
    year: '2024',
    type: 'movie',
    plot: 'The beloved cat Garfield goes on an adventure.',
    directors: 'Mark Dindal',
    genre: 'Animation, Comedy, Family',
    rating: '5.8',
    downloadLink: '#'
  },
  {
    _id: '7',
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
    _id: '8',
    title: 'Queen of Tears',
    year: '2024',
    type: 'tvshow',
    plot: 'A Korean drama about a married couple facing challenges.',
    directors: 'Jang Young-woo',
    genre: 'Drama, Romance',
    rating: '8.7',
    downloadLink: '#'
  },
  {
    _id: '9',
    title: 'Never have I ever',
    year: '2020-2023',
    type: 'tvshow',
    plot: 'A coming-of-age comedy-drama about an Indian-American teenager.',
    directors: 'Mindy Kaling, Lang Fisher',
    genre: 'Comedy, Drama',
    rating: '7.8',
    downloadLink: '#'
  },
  {
    _id: '10',
    title: 'Ginny & Georgia',
    year: '2021-2023',
    type: 'tvshow',
    plot: 'A mother and daughter navigate life in a new town.',
    directors: 'Sarah Lampert',
    genre: 'Comedy, Drama',
    rating: '7.5',
    downloadLink: '#'
  },
  {
    _id: '11',
    title: 'Mr.Plankton',
    year: '2024',
    type: 'tvshow',
    plot: 'A Korean romantic drama series.',
    directors: 'Hong Jong-chan',
    genre: 'Drama, Romance',
    rating: '8.1',
    downloadLink: '#'
  },
  {
    _id: '12',
    title: 'The summer I turned pretty',
    year: '2022-2023',
    type: 'tvshow',
    plot: 'A love triangle develops during summer vacations.',
    directors: 'Jenny Han',
    genre: 'Drama, Romance',
    rating: '7.4',
    downloadLink: '#'
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Movies & TV Shows API is running!' });
});

// Get all movies with optional search
app.get('/api/movies', async (req, res) => {
  try {
    const { query } = req.query;
    
    // Try to get from database first
    let movies;
    try {
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
        movies = sampleMovies;
        if (query) {
          movies = movies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.genre.toLowerCase().includes(query.toLowerCase()) ||
            movie.directors.toLowerCase().includes(query.toLowerCase())
          );
        }
      }
    } catch (dbError) {
      // If database error, use sample data
      console.log('Using sample data due to database error');
      movies = sampleMovies;
      if (query) {
        movies = movies.filter(movie => 
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.genre.toLowerCase().includes(query.toLowerCase()) ||
          movie.directors.toLowerCase().includes(query.toLowerCase())
        );
      }
    }
    
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
    
    // Try database first
    let movie;
    try {
      movie = await Movie.findById(id);
    } catch (dbError) {
      // Use sample data
      movie = sampleMovies.find(m => m._id === id);
    }
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});