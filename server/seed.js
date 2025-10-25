const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movies_app')
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Define Movie Schema (more realistic fields)
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  year: String,
  type: { type: String, enum: ['movie', 'tv'], required: true },
  duration: String,            // e.g. "1h 45m" or "45m"
  seasons: Number,             // for tv shows
  episodes: Number,            // total episodes (optional)
  cast: [String],
  language: String,
  subtitles: Boolean,
  downloadLink: String,
  poster: String,              // path or URL to poster
  plot: String,
  directors: String,
  genre: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

// Create Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Sample movies & tv shows data (more realistic fields, poster paths point to public/assets)
const sampleMovies = [
  {
    title: "Wild Robot",
    slug: "wild-robot",
    year: "2024",
    type: "movie",
    duration: "1h 52m",
    subtitles: true,
    downloadLink: "https://example.com/download/wildrobot",
    poster: "/assets/posters/wildrobot.jpg",
    plot: "Roz, a robot stranded on a remote island, learns to adapt and protect the wildlife while searching for a way home.",
    directors: "Chris Sanders",
    cast: ["Roz (voice)", "Docking Crew"],
    language: "English",
    genre: "Animation, Adventure, Family",
    rating: 7.8
  },
  {
    title: "Chennai Express",
    slug: "chennai-express",
    year: "2013",
    type: "movie",
    duration: "2h 15m",
    subtitles: true,
    downloadLink: "https://example.com/download/chennaiexpress",
    poster: "/assets/posters/chennaiexpress.jpg",
    plot: "An ordinary man gets caught in a cross-country adventure while transporting his dead grandfather's body.",
    directors: "Rohit Shetty",
    cast: ["Shah Rukh Khan", "Deepika Padukone"],
    language: "Hindi",
    genre: "Action, Comedy, Romance",
    rating: 6.0
  },
  {
    title: "Moana",
    slug: "moana",
    year: "2016",
    type: "movie",
    duration: "1h 47m",
    subtitles: true,
    downloadLink: "https://example.com/download/moana",
    poster: "/assets/posters/moana.jpg",
    plot: "A spirited teenager sails out on a daring mission to save her people and finds her own identity.",
    directors: "Ron Clements, John Musker",
    cast: ["Auli'i Cravalho", "Dwayne Johnson"],
    language: "English",
    genre: "Animation, Adventure, Comedy",
    rating: 7.6
  },
  {
    title: "Garfield",
    slug: "garfield",
    year: "2024",
    type: "movie",
    duration: "1h 30m",
    subtitles: true,
    downloadLink: "https://example.com/download/garfield",
    poster: "/assets/posters/garfield.jpg",
    plot: "Garfield ventures outside his comfort zone on an unexpected adventure with his long-lost father.",
    directors: "Mark Dindal",
    cast: ["Chris Pratt", "Samuel L. Jackson"],
    language: "English",
    genre: "Animation, Comedy",
    rating: 6.2
  },

  // TV shows - type uses 'tv' for consistency
  {
    title: "Breaking Bad",
    slug: "breaking-bad",
    year: "2008-2013",
    type: "tv",
    seasons: 5,
    episodes: 62,
    duration: "45m",
    subtitles: true,
    downloadLink: "https://example.com/download/breakingbad",
    poster: "/assets/posters/breakingbad.jpg",
    plot: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's future.",
    directors: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul"],
    language: "English",
    genre: "Crime, Drama, Thriller",
    rating: 9.5
  },
  {
    title: "Queen of Tears",
    slug: "queen-of-tears",
    year: "2024",
    type: "tv",
    seasons: 1,
    episodes: 16,
    duration: "60m",
    subtitles: true,
    downloadLink: "https://example.com/download/queenoftears",
    poster: "/assets/posters/queenoftears.jpg",
    plot: "A chaebol heiress and her husband must fight to save their marriage and their conglomerate amid scandals.",
    directors: "Jang Young-woo, Kim Hee-won",
    cast: ["Lead Actor A", "Lead Actress B"],
    language: "Korean",
    genre: "Drama, Romance",
    rating: 8.7
  },
  {
    title: "Ginny & Georgia",
    slug: "ginny-and-georgia",
    year: "2021-",
    type: "tv",
    seasons: 3,
    episodes: 30,
    duration: "50m",
    subtitles: true,
    downloadLink: "https://example.com/download/ginnygeorgia",
    poster: "/assets/posters/ginnygeorgia
  {
    title: "Mr.Plankton",
    year: "2023",
    type: "tvshow",
    subtitles: true,
    downloadLink: "https://example.com/download/mrplankton",
    poster: "mrplankton.jpg",
    plot: "A man who has been told he has 100 days to live decides to make the most of his remaining time with the help of a mysterious woman.",
    directors: "Jung Ji-woo",
    genre: "Comedy, Drama, Romance",
    rating: "7.7"
  },
  {
    title: "The summer I turned pretty",
    year: "2022-2023",
    type: "tvshow",
    subtitles: true,
    downloadLink: "https://example.com/download/summer",
    poster: "summer.jpg",
    plot: "A girl's coming-of-age journey set against the backdrop of her family's beach house, where she finds herself in a love triangle with two brothers.",
    directors: "Jenny Han",
    genre: "Drama, Romance",
    rating: "7.4"
  }
];

// Seed function
const seedDB = async () => {
  try {
    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies collection');
    
    // Insert sample movies
    await Movie.insertMany(sampleMovies);
    console.log('Added sample movies to database');
    
    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDB();