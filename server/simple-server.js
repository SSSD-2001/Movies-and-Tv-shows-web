const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
  res.send('Movies & TV Shows API Server');
});

// Get all movies with optional search
app.get('/api/movies', (req, res) => {
  try {
    const { query } = req.query;
    let movies = sampleMovies;
    
    if (query) {
      movies = movies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase()) ||
        movie.directors.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    console.log(`Returning ${movies.length} movies`);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get movie by ID
app.get('/api/movies/:id', (req, res) => {
  try {
    const { id } = req.params;
    const movie = sampleMovies.find(m => m._id === id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    console.log(`Returning movie: ${movie.title}`);
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
  console.log(`Sample data loaded with ${sampleMovies.length} movies/shows`);
});
