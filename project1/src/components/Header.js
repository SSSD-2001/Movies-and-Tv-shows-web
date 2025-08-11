import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';

function Header({ isLoggedIn, setIsLoggedIn, token }) {
  return (
    <div className="header-buttons">
      <Link to="/">
        <button className="nav-button">Home</button>
      </Link>
      <Link to="/about">
        <button className="nav-button">About Us</button>
      </Link>
      {isLoggedIn ? (
        <>
          <button className="nav-button" onClick={setIsLoggedIn}>
            Logout
          </button>
          <CartIcon token={token} />
        </>
      ) : (
        <Link to="/login">
          <button className="nav-button">Login</button>
        </Link>
      )}
    </div>
  );
}

export default Header;