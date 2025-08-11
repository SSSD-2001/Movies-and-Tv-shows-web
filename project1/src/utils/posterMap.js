// Import your poster images
import wildRobotPoster from '../assets/wildrobot.jpg';
import chennaiExpressPoster from '../assets/chennaiexpress.jpg';
import itEndsWithUsPoster from '../assets/itendswithus.jpg';
import moanaPoster from '../assets/moana.jpg';
import amaranPoster from '../assets/amaran.jpg';
import garfieldPoster from '../assets/garfield.jpg';
import breakingBadPoster from '../assets/breakingbad.jpg';
import queenOfTearsPoster from '../assets/queenoftears.jpg';
import neverHaveIEverPoster from '../assets/neverhaveiever.jpg';
import ginnyGeorgiaPoster from '../assets/ginnygeorgia.jpg';
import mrPlanktonPoster from '../assets/mrplankton.jpg';
import summerPoster from '../assets/summer.jpg';
//import defaultPoster from '../assets/default-poster.jpg';

const posterMap = {
  'Wild Robot': wildRobotPoster,
  'Chennai Express': chennaiExpressPoster,
  'It ends with us': itEndsWithUsPoster,
  'Moana': moanaPoster,
  'Amaran': amaranPoster,
  'Garfield': garfieldPoster,
  'Breaking Bad': breakingBadPoster,
  'Queen of Tears': queenOfTearsPoster,
  'Never have I ever': neverHaveIEverPoster,
  'Ginny & Georgia': ginnyGeorgiaPoster,
  'Mr.Plankton': mrPlanktonPoster,
  'The summer I turned pretty': summerPoster
};

// Update the getPosterForTitle function
export const getPosterForTitle = (title) => {
  console.log(`Looking for poster for: "${title}"`);
  const poster = posterMap[title];
  
  if (poster) {
    return poster;
  } else {
    console.log(`No poster found for: "${title}"`);
    return `https://via.placeholder.com/300x450?text=${encodeURIComponent(title)}`;
  }
};