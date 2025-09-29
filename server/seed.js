const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movies_app')
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Define Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  type: String,
  subtitles: Boolean,
  downloadLink: String,
  poster: String,
  plot: String,
  directors: String,
  genre: String,
  rating: String
});

// Create Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Sample movies data
const sampleMovies = [
  {
    title: "Wild Robot",
    year: "2024",
    type: "movie",
    subtitles: true,
    downloadLink: "https://example.com/download/wildrobot",
    poster: "wildrobot.jpg",
    plot: "The story follows the adventures of Roz, a robot who becomes stranded on a remote island.",
    directors: "Chris Sanders",
    genre: "Animation, Adventure, Family",
    rating: "7.8"
  },
  {
    title: "Chennai Express",
    year: "2013",
    type: "movie",
    subtitles: true,
    downloadLink: "https://example.com/download/chennaiexpress",
    poster: "chennaiexpress.jpg",
    plot: "A man traveling to fulfill his grandmother's last wish finds himself on a journey with a young woman running from an arranged marriage.",
    directors: "Rohit Shetty",
    genre: "Action, Comedy, Romance",
    rating: "6.0"
  },
  {
    title: "It ends with us",
    year: "2024",
    type: "movie",
    subtitles: true,
    downloadLink: "https://example.com/download/itendswithus",
    poster: "itendswithus.jpg",
    plot: "A woman falls in love with a man who is perfect in every way, until an incident forces her to question everything.",
    directors: "Justin Baldoni",
    genre: "Drama, Romance",
    rating: "6.5"
  },
  {
    title: "Moana",
    year: "2016",
    type: "movie",
    subtitles: true,
    downloadLink: "https://example.com/download/moana",
    poster: "moana.jpg",
    plot: "In Ancient Polynesia, when a terrible curse incurred by the Demigod Maui reaches Moana's island, she answers the Ocean's call to seek out the Demigod to set things right.",
    directors: "Ron Clements, John Musker",
    genre: "Animation, Adventure, Comedy",
    rating: "7.6"
  },
  {
    title: "Amaran",
    year: "2023",
    type: "movie",
    subtitles: true,
    downloadLink: "https://example.com/download/amaran",
    poster: "amaran.jpg",
    plot: "Based on the life of Major Mukund Varadarajan, who was martyred during an anti-terrorist operation in Kashmir.",
    directors: "Rajkumar Periasamy",
    genre: "Action, Biography, Drama",
    rating: "8.2"
  },
  {
    title: "Garfield",
    year: "2024",
    type: "movie",
    subtitles: true,
    downloadLink: "https://example.com/download/garfield",
    poster: "garfield.jpg",
    plot: "Garfield is about to go on a wild outdoor adventure after his long-lost father returns.",
    directors: "Mark Dindal",
    genre: "Animation, Adventure, Comedy",
    rating: "6.2"
  },
  {
    title: "Breaking Bad",
    year: "2008-2013",
    type: "tvshow",
    subtitles: true,
    downloadLink: "https://example.com/download/breakingbad",
    poster: "breakingbad.jpg",
    plot: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    directors: "Vince Gilligan",
    genre: "Crime, Drama, Thriller",
    rating: "9.5"
  },
  {
    title: "Queen of Tears",
    year: "2024",
    type: "tvshow",
    subtitles: true,
    downloadLink: "https://example.com/download/queenoftears",
    poster: "queenoftears.jpg",
    plot: "The story of a chaebol heiress and her husband trying to save their marriage amid various challenges.",
    directors: "Jang Young-woo, Kim Hee-won",
    genre: "Drama, Romance",
    rating: "8.7"
  },
  {
    title: "Ginny & Georgia",
    year: "2021-2023",
    type: "tvshow",
    subtitles: true,
    downloadLink: "https://example.com/download/ginnygeorgia",
    poster: "ginnygeorgia.jpg",
    plot: "Teenager Ginny and her mother Georgia move to a New England town to start afresh, but the mother's secrets threaten their new way of life.",
    directors: "Sarah Lampert",
    genre: "Comedy, Drama",
    rating: "7.4"
  },
  {
    title: "Never have I ever",
    year: "2020-2023",
    type: "tvshow",
    subtitles: true,
    downloadLink: "https://example.com/download/neverhaveiever",
    poster: "neverhaveiever.jpg",
    plot: "The complicated life of a modern-day first generation Indian American teenage girl, inspired by Mindy Kaling's own childhood.",
    directors: "Mindy Kaling, Lang Fisher",
    genre: "Comedy, Drama",
    rating: "7.9"
  },
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