
/*import React from 'react';

function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a href="/" className="navbar-brand">Movies & TV Shows</a>
            </div>
        </nav>
    );
}

export default Header;*/

import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="header-buttons">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="btn btn-light-blue">Logout</button>
      ) : (
        <Link to="/login" className="btn btn-light-blue">Login</Link>
      )}
      <Link to="/" className="btn btn-light-blue ml-2">Home</Link>
      <Link to="/about" className="btn btn-light-blue ml-2">About Us</Link>
    </div>
  );
}

export default Header;