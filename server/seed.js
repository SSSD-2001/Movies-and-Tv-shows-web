const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movies_app')
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Example minimal seed structure — ensure every string/array/object is properly closed with matching quotes/braces
const sampleMovies = [
  {
    title: "Example Movie",
    year: "2024",
    type: "movie",
    poster: "/assets/posters/example.jpg",
    genre: "Action, Drama"
  }
];

async function seedDB() {
  try {
    const Movie = mongoose.model('Movie', new mongoose.Schema({}, { strict: false, collection: 'movies' }));
    await Movie.deleteMany({});
    await Movie.insertMany(sampleMovies);
    console.log('Seeded movies');
  } catch (err) {
    console.error('Seed error', err);
  } finally {
    mongoose.disconnect();
  }
}

seedDB();