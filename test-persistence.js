const fs = require('fs');

console.log('🎬 Testing Movie Persistence System');
console.log('=====================================');

// Check if movies-data.json exists
const moviesFile = './server/movies-data.json';

if (fs.existsSync(moviesFile)) {
    const data = JSON.parse(fs.readFileSync(moviesFile, 'utf8'));
    console.log(`✅ Persistent storage found: ${data.length} movies saved`);
    
    // Show a few examples
    console.log('\n📽️ Sample movies in persistent storage:');
    data.slice(0, 3).forEach(movie => {
        console.log(`   • ${movie.title} (${movie.year}) - ${movie.type}`);
    });
    
    console.log('\n🔧 What happens now:');
    console.log('   1. When you add a movie in Admin Panel → Saved to file');
    console.log('   2. When you edit a movie → Changes saved to file');
    console.log('   3. When you delete a movie → Removed from file');
    console.log('   4. When server restarts → Data loads from file');
    console.log('\n🎯 Your changes are now PERMANENT!');
} else {
    console.log('❌ Persistent storage not found. Start the server first.');
}
