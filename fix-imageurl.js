const fs = require('fs');

console.log('🔧 Adding imageUrl field to existing movies...');

// Read the current movies
const moviesFile = './server/movies-data.json';
const movies = JSON.parse(fs.readFileSync(moviesFile, 'utf8'));

// Add imageUrl field to all movies that don't have it
let updatedCount = 0;
movies.forEach(movie => {
    if (!movie.imageUrl) {
        movie.imageUrl = '';  // Add empty imageUrl field
        updatedCount++;
    }
});

// Save back to file
fs.writeFileSync(moviesFile, JSON.stringify(movies, null, 2));

console.log(`✅ Updated ${updatedCount} movies with imageUrl field`);
console.log('📋 Sample updated movie:');
console.log(JSON.stringify(movies[0], null, 2));
