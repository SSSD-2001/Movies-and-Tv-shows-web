import mongoose from 'mongoose';
import { Movie } from './models';
import { connectToDatabase } from './config/database';

const seedMovies = [
    {
        title: 'Wild Robot',
        year: 'September 27, 2024 (USA)',
        poster: 'https://m.media-amazon.com/images/M/MV5BYTFkNDI5NzUtY2U3MS00ZDQ5LWEyMDMtYzAwNDQ0NWY5YTNiXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
        type: 'movie',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Chennai Express',
        year: 'August 8, 2013 (Sri Lanka)',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTg4MDQxNF5BMl5BanBnXkFtZTcwNjU5OTI3OQ@@._V1_.jpg',
        type: 'movie',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'It ends with us',
        year: 'August 9, 2024 (USA)',
        poster: 'https://example.com/itendswithas.jpg',
        type: 'movie',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Moana',
        year: 'November 27, 2024 (USA)',
        poster: 'https://example.com/moana.jpg',
        type: 'movie',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Amaran',
        year: 'October 31, 2024 (India)',
        poster: 'https://example.com/amaran.jpg',
        type: 'movie',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Garfield',
        year: 'May 24, 2024 (USA)',
        poster: 'https://example.com/garfield.jpg',
        type: 'movie',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Breaking Bad',
        year: 'January 20, 2008 (USA)',
        poster: 'https://example.com/breakingbad.jpg',
        type: 'tvshow',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Queen of Tears',
        year: 'March 9, 2024 (South Korea)',
        poster: 'https://example.com/queenoftears.jpg',
        type: 'tvshow',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Never have I ever',
        year: 'April 27, 2020 (USA)',
        poster: 'https://example.com/neverhaveiever.jpg',
        type: 'tvshow',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Ginny & Georgia',
        year: 'February 24, 2021 (USA)',
        poster: 'https://example.com/ginnygeorgia.jpg',
        type: 'tvshow',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'Mr.Plankton',
        year: 'November 8, 2024 (South Korea)',
        poster: 'https://example.com/mrplankton.jpg',
        type: 'tvshow',
        subtitles: 'English',
        downloadLink: '#'
    },
    {
        title: 'The summer I turned pretty',
        year: 'June 17, 2022 (USA)',
        poster: 'https://example.com/summer.jpg',
        type: 'tvshow',
        subtitles: 'English',
        downloadLink: '#'
    }
];

const seedDB = async () => {
    try {
        // Connect to MongoDB
        await connectToDatabase();
        
        // Clear the movies collection
        await Movie.deleteMany({});
        console.log('Movies collection cleared');
        
        // Insert seed data
        await Movie.insertMany(seedMovies);
        console.log('Sample movies added to the database');
        
        // Close the connection
        await mongoose.disconnect();
        console.log('Database seeding completed');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

// Run the seed function
seedDB();