import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Header from './components/Header';
import AboutUs from './components/AboutUs';

import './App.css';

import wildRobotPoster from './assets/Wild robot.jpg';
import ChennaiExpressPoster from './assets/Chennai express.jpg';
import itEndsWithUsPoster from './assets/It ens with us.jpeg';
import garfieldPoster from './assets/garfield.jpg';
import AmaranPoster from './assets/Amaran2.jpg';
import MoanaPoster from './assets/moana.jpeg';

import summerPoster from './assets/summer.jpg';
import BreakingbadPoster from './assets/breaking bad.jpeg';
import QueenOfTearsPoster from './assets/Queen of tears.jpg';
import NeverHaveIEverPoster from './assets/Never have.jpg';
import GinnyGeorgiaPoster from './assets/Ginny & Georgia.jpg';
import PlanktonPoster from './assets/Plankton.jpg';


const staticMovies = [
  {
    imdbID: '1',
    Title: 'Wild Robot',
    Year: 'September 27, 2024 (USA)',
    Poster: wildRobotPoster,
    Type: 'movie',
  },
  {
    imdbID: '2',
    Title: 'Chennai Express',
    Year: 'August 8, 2013 (Sri Lanka)',
    Poster: ChennaiExpressPoster,
    Type: 'movie',
  },
  {
    imdbID: '3',
    Title: 'It ends with us',
    Year: 'August 9, 2024 (USA)',
    Poster: itEndsWithUsPoster,
    Type: 'movie',
  },
  {
    imdbID: '2',
    Title: 'Moana',
    Year: 'November 27, 2024 (USA)',
    Poster: MoanaPoster,
    Type: 'movie',
  },
  {
    imdbID: '4',
    Title: 'Amaran',
    Year: 'October 31, 2024 (India)',
    Poster: AmaranPoster,
    Type: 'movie',
  },
  {
    imdbID: '5',
    Title: 'Garfield',
    Year: 'May 24, 2024 (USA)',
    Poster: garfieldPoster,
    Type: 'movie',
  },
  {
    imdbID: '7',
    Title: 'Breaking Bad',
    Year: 'January 20, 2008 (USA)',
    Poster: BreakingbadPoster,
    Type: 'tvshow',
  },
  {
    imdbID: '8',
    Title: 'Queen of Tears',
    Year: 'March 9, 2024 (South Korea)',
    Poster: QueenOfTearsPoster,
    Type: 'tvshow',
  },
  {
    imdbID: '9',
    Title: 'Never have I ever',
    Year: 'April 27, 2020 (USA)',
    Poster: NeverHaveIEverPoster,
    Type: 'tvshow',
  },
  {
    imdbID: '10',
    Title: 'Ginny & Georgia',
    Year: 'February 24, 2021 (USA)',
    Poster: GinnyGeorgiaPoster,
    Type: 'tvshow',
  },
  {
    imdbID: '11',
    Title: 'Mr.Plankton',
    Year: 'November 8, 2024 (South Korea)',
    Poster: PlanktonPoster,
    Type: 'tvshow',
  },
  {
    imdbID: '6',
    Title: 'The summer I turned pretty',
    Year: 'June 17, 2022 (USA)',
    Poster: summerPoster,
    Type: 'tvshow',
  },
];

function App() {
  const [movies, setMovies] = useState(staticMovies);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (query) => {
    const filteredMovies = staticMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  return (
    <Router>
      <div>
        <h1 className="title">
          Movies & TV Shows
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </h1>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;