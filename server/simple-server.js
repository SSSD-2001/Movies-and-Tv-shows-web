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
  },
  {
    _id: '9',
    title: 'Stranger Things',
    year: '2016-2025',
    type: 'tvshow',
    plot: 'A group of kids in a small town uncover supernatural mysteries.',
    directors: 'The Duffer Brothers',
    genre: 'Drama, Fantasy, Horror',
    rating: '8.7',
    downloadLink: '#'
  },
  {
    _id: '10',
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
    _id: '11',
    title: 'Money Heist',
    year: '2017-2021',
    type: 'tvshow',
    plot: 'A criminal mastermind manipulates the police to carry out perfect heists.',
    directors: 'Álex Pina',
    genre: 'Action, Crime, Mystery',
    rating: '8.2',
    downloadLink: '#'
  },
  {
    _id: '12',
    title: 'The Office',
    year: '2005-2013',
    type: 'tvshow',
    plot: 'A mockumentary on a group of typical office workers.',
    directors: 'Greg Daniels',
    genre: 'Comedy',
    rating: '9.0',
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

// Authentication endpoints
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  console.log(`Registration: ${username}, ${email}`);
  res.json({ 
    message: 'Registration successful',
    user: { username, email },
    token: 'demo-token-' + Date.now()
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  console.log(`Login: ${username}`);
  res.json({
    message: 'Login successful',
    user: { username },
    token: 'demo-token-' + Date.now()
  });
});

// Cart endpoints
app.post('/api/cart/:movieId', (req, res) => {
  const { movieId } = req.params;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  console.log(`Added movie ${movieId} to cart`);
  res.json({
    message: 'Movie added to cart successfully',
    movieId: movieId,
    cartId: 'cart-' + Date.now()
  });
});

app.delete('/api/cart/:movieId', (req, res) => {
  const { movieId } = req.params;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  console.log(`Removed movie ${movieId} from cart`);
  res.json({
    message: 'Movie removed from cart successfully',
    movieId: movieId
  });
});

app.get('/api/cart', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  console.log('Fetching user cart');
  res.json({
    message: 'Cart retrieved successfully',
    items: [],
    total: 0
  });
});

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
  console.log(`Sample data loaded with ${sampleMovies.length} movies/shows`);
  console.log('Server is ready to receive requests...');
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

// Keep the process alive
setInterval(() => {
  // This keeps the process running
}, 60000);
