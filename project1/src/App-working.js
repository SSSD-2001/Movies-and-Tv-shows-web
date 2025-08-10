import React, { useState, useEffect } from 'react';
import './App-enhanced.css';

// Mock data for movies and TV shows
const mockMovies = [
  { id: 1, title: "Breaking Bad", genre: "Drama", type: "tv", poster: "breakingbad.jpg" },
  { id: 2, title: "Money Heist", genre: "Action", type: "tv", poster: "money.jpg" },
  { id: 3, title: "Queen of Tears", genre: "Romance", type: "tv", poster: "queenoftears.jpg" },
  { id: 4, title: "Cars", genre: "Animation", type: "movie", poster: "cars.jpg" },
  { id: 5, title: "Moana", genre: "Animation", type: "movie", poster: "moana.jpg" },
  { id: 6, title: "Harry Potter", genre: "Fantasy", type: "movie", poster: "harrypotter.jpg" }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [filteredContent, setFilteredContent] = useState(mockMovies);

  useEffect(() => {
    let filtered = mockMovies;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredContent(filtered);
  }, [searchTerm, selectedType]);

  return (
    <div className="App">
      <header className="header">
        <nav className="nav-menu">
          <h1>Movies & TV Shows</h1>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#movies">Movies</a></li>
            <li><a href="#tv-shows">TV Shows</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Search movies and TV shows..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div style={{ margin: '20px 0' }}>
            <button 
              onClick={() => setSelectedType('all')}
              style={{ 
                margin: '0 10px', 
                padding: '10px 20px',
                backgroundColor: selectedType === 'all' ? '#61dafb' : '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedType('movie')}
              style={{ 
                margin: '0 10px', 
                padding: '10px 20px',
                backgroundColor: selectedType === 'movie' ? '#61dafb' : '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Movies
            </button>
            <button 
              onClick={() => setSelectedType('tv')}
              style={{ 
                margin: '0 10px', 
                padding: '10px 20px',
                backgroundColor: selectedType === 'tv' ? '#61dafb' : '#f0f0f0',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              TV Shows
            </button>
          </div>
        </div>

        <div className="movie-grid">
          {filteredContent.map(item => (
            <div key={item.id} className="movie-card">
              <div 
                className="movie-poster" 
                style={{ 
                  backgroundColor: '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666'
                }}
              >
                {item.poster}
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{item.title}</h3>
                <p className="movie-genre">{item.genre} • {item.type === 'movie' ? 'Movie' : 'TV Show'}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
