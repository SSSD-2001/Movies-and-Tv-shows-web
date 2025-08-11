// Test script for CRUD operations
// You can run this in the browser console or as a Node.js script

const API_URL = 'http://localhost:5003/api';

// Test CREATE operation
async function testCreateMovie() {
  const movieData = {
    title: "CRUD Test Movie",
    year: "2024",
    type: "movie",
    plot: "A test movie created via CRUD API",
    directors: "CRUD Director",
    genre: "Action, Test",
    rating: "9.0",
    downloadLink: "https://example.com/crud-test"
  };

  try {
    const response = await fetch(`${API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });
    
    const result = await response.json();
    console.log('CREATE Result:', result);
    return result.movie._id;
  } catch (error) {
    console.error('CREATE Error:', error);
  }
}

// Test READ operation
async function testReadMovies() {
  try {
    const response = await fetch(`${API_URL}/movies`);
    const movies = await response.json();
    console.log('READ Result:', `Found ${movies.length} movies`);
    return movies;
  } catch (error) {
    console.error('READ Error:', error);
  }
}

// Test UPDATE operation
async function testUpdateMovie(movieId) {
  const updateData = {
    title: "UPDATED: CRUD Test Movie",
    rating: "9.5",
    plot: "Updated plot for the test movie"
  };

  try {
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    
    const result = await response.json();
    console.log('UPDATE Result:', result);
    return result;
  } catch (error) {
    console.error('UPDATE Error:', error);
  }
}

// Test DELETE operation
async function testDeleteMovie(movieId) {
  try {
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
      method: 'DELETE',
    });
    
    const result = await response.json();
    console.log('DELETE Result:', result);
    return result;
  } catch (error) {
    console.error('DELETE Error:', error);
  }
}

// Run all CRUD tests
async function runCRUDTests() {
  console.log('🚀 Starting CRUD Tests...\n');
  
  // Test READ
  console.log('1. Testing READ operation:');
  const movies = await testReadMovies();
  
  // Test CREATE
  console.log('\n2. Testing CREATE operation:');
  const newMovieId = await testCreateMovie();
  
  if (newMovieId) {
    // Test UPDATE
    console.log('\n3. Testing UPDATE operation:');
    await testUpdateMovie(newMovieId);
    
    // Test DELETE
    console.log('\n4. Testing DELETE operation:');
    await testDeleteMovie(newMovieId);
  }
  
  console.log('\n✅ CRUD Tests completed!');
}

// Export for browser use
if (typeof window !== 'undefined') {
  window.runCRUDTests = runCRUDTests;
  window.testCreateMovie = testCreateMovie;
  window.testReadMovies = testReadMovies;
  window.testUpdateMovie = testUpdateMovie;
  window.testDeleteMovie = testDeleteMovie;
}

// For Node.js use
if (typeof module !== 'undefined') {
  module.exports = {
    runCRUDTests,
    testCreateMovie,
    testReadMovies,
    testUpdateMovie,
    testDeleteMovie
  };
}
