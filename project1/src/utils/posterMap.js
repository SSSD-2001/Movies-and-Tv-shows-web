// Import your poster images
import wildRobotPoster from '../assets/wildrobot.jpg';
import chennaiExpressPoster from '../assets/chennaiexpress.jpg';
import itEndsWithUsPoster from '../assets/itendswithus.jpg';
import moanaPoster from '../assets/moana.jpg';
import amaranPoster from '../assets/amaran.jpg';
import carsPoster from '../assets/cars.jpg';
import garfieldPoster from '../assets/garfield.jpg';
import breakingBadPoster from '../assets/breakingbad.jpg';
import queenOfTearsPoster from '../assets/queenoftears.jpg';
import neverHaveIEverPoster from '../assets/neverhaveiever.jpg';
import ginnyGeorgiaPoster from '../assets/ginnygeorgia.jpg';
import mrPlanktonPoster from '../assets/mrplankton.jpg';
import summerPoster from '../assets/summer.jpg';
import moneyHeistPoster from '../assets/money.jpg';
import strangerThingsPoster from '../assets/strangerthings.jpg';
import theCrownPoster from '../assets/crown.jpg';
import theOfficePoster from '../assets/theoffice.jpg';



const posterMap = {
  'Wild Robot': wildRobotPoster,
  'Chennai Express': chennaiExpressPoster,
  'It ends with us': itEndsWithUsPoster,
  'Moana': moanaPoster,
  'Amaran': amaranPoster,
  'Cars': carsPoster,
  'Garfield': garfieldPoster,
  'Breaking Bad': breakingBadPoster,
  'Queen of Tears': queenOfTearsPoster,
  'Never Have I Ever': neverHaveIEverPoster,
  'Ginny & Georgia': ginnyGeorgiaPoster,
  'Mr.Plankton': mrPlanktonPoster,
  'The summer I turned pretty': summerPoster,
  'Money Heist': moneyHeistPoster,
  'Stranger Things': strangerThingsPoster,
  'The Crown': theCrownPoster,
  'The Office': theOfficePoster
};

// Update the getPosterForTitle function
export const getPosterForTitle = (title) => {
  console.log(`Looking for poster for: "${title}"`);
  
  // First try exact match
  let poster = posterMap[title];
  
  if (poster) {
    console.log(`Found poster for: "${title}"`);
    return poster;
  }
  
  // Try case-insensitive match
  const lowerTitle = title.toLowerCase();
  for (const [key, value] of Object.entries(posterMap)) {
    if (key.toLowerCase() === lowerTitle) {
      console.log(`Found poster with case-insensitive match for: "${title}"`);
      return value;
    }
  }
  
};