import React, { useState } from 'react';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';

import './App.css';

import wildRobotPoster from './assets/Wild robot.jpg';
import ChennaiExpressPoster from './assets/Chennai express.jpg';
import itEndsWithUsPoster from './assets/It ens with us.jpeg';
import garfieldPoster from './assets/garfield.jpg';
import AmaranPoster from './assets/Amaran2.jpg';

import summerPoster from './assets/summer.jpg';
import BreakingbadPoster from './assets/breaking bad.jpeg';
import QueenOfTearsPoster from './assets/Queen of tears.jpg';
import NeverHaveIEverPoster from './assets/Never have.jpg';
import GinnyGeorgiaPoster from './assets/Ginny & Georgia.jpg';
import PlanktonPoster from './assets/Plankton.jpg';

const staticMovies = [
  {
    Title: 'Wild Robot',
    Year: 'September 27, 2024 (USA)',
    Poster: wildRobotPoster,
    Type: 'movie',
  },
  {
    Title: 'Chennai Express',
    Year: 'August 8, 2013 (Sri Lanka)',
    Poster: ChennaiExpressPoster,
    Type: 'movie',
  },
  {
    Title: 'It ends with us',
    Year: 'August 9, 2024 (USA)',
    Poster: itEndsWithUsPoster,
    Type: 'movie',
  },
  {
    Title: 'Amaran',
    Year: 'October 31, 2024 (India)',
    Poster: AmaranPoster,
    Type: 'movie',
  },
  {
    Title: 'Garfield',
    Year: 'May 24, 2024 (USA)',
    Poster: garfieldPoster,
    Type: 'movie',
  },
  {
    Title: 'The summer I turned pretty',
    Year: 'June 17, 2022 (USA)',
    Poster: summerPoster,
    Type: 'tvshow',
  },
  {
    Title: 'Breaking Bad',
    Year: 'January 20, 2008 (USA)',
    Poster: BreakingbadPoster,
    Type: 'tvshow',
  },
  {
    Title: 'Queen of Tears',
    Year: 'March 9, 2024 (South Korea)',
    Poster: QueenOfTearsPoster,
    Type: 'tvshow',
  },
  {
    Title: 'Never have I ever',
    Year: 'April 27, 2020 (USA)',
    Poster: NeverHaveIEverPoster,
    Type: 'tvshow',
  },
  {
    Title: 'Ginny & Georgia',
    Year: 'February 24, 2021 (USA)',
    Poster: GinnyGeorgiaPoster,
    Type: 'tvshow',
  },
  {
    Title: 'Mr.Plankton',
    Year: 'November 8, 2024 (South Korea)',
    Poster: PlanktonPoster,
    Type: 'tvshow',
  },
];

function App() {
  const [movies, setMovies] = useState(staticMovies);

  const handleSearch = (query) => {
    const filteredMovies = staticMovies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  const movieList = movies.filter(movie => movie.Type === 'movie');
  const tvShowList = movies.filter(movie => movie.Type === 'tvshow');

  return (
    <div>
      
      <h1>Movies & TV Shows</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
      
            <h2>--- Movies ---</h2>
            {movieList.length > 0 ? (
              movieList.map((movie) => (
                /*<div key={movie.imdbID}>
                  <h3>Name: {movie.Title}</h3>
                  <p>Released Date: {movie.Year}</p>
                  <img src={movie.Poster} alt={movie.Title} style={{ width: '120px' }} /><hr/>
                </div>*/
                <MovieCard
                  key={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  poster={movie.Poster}
                />
              ))
            ) : (
              <p>No movies found...</p>
            )}
          </div>
          <div className="col-md-6">
            <h2>--- TV Shows ---</h2>
            {tvShowList.length > 0 ? (
              tvShowList.map((tvshow) => (
                /*<div key={tvshow.imdbID}>
                  <h4>Name: {tvshow.Title}</h4>
                  <p>Year: {tvshow.Year}</p>
                  <img src={tvshow.Poster} alt={tvshow.Title} style={{ width: '120px' }} /><hr/>
                </div>*/
                <MovieCard
                  key={tvshow.imdbID}
                  title={tvshow.Title}
                  year={tvshow.Year}
                  poster={tvshow.Poster}
                />
              ))
            ) : (
              <p>No TV shows found...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;