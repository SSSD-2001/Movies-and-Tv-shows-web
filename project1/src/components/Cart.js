import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, removeFromCart } from '../services/api';
import { getPosterForTitle } from '../utils/posterMap';
import '../App.css';

function Cart({ token }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login?redirect=cart');
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      try {
        const cartData = await getCart(token);
        setCart(cartData);
        setError('');
      } catch (err) {
        setError('Failed to fetch cart');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  const handleRemoveItem = async (movieId) => {
    try {
      const updatedCart = await removeFromCart(movieId, token);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
    }
  };

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => {
      const price = item.price || 9.99; // Default price if not provided
      return total + price;
    }, 0).toFixed(2);
  };

  if (!token) return null;
  if (loading) return <div className="text-center mt-5"><p>Loading...</p></div>;
  if (error) return <div className="text-center mt-5 text-danger"><p>{error}</p></div>;

  return (
    <div className="cart-container">
      <h2 className="section-title">Your Cart</h2>
      {cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/movies">
            <button className="nav-button">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => {
              // Determine the best image source
              const imageSource = item.imageUrl || item.poster || getPosterForTitle(item.title);
              
              // Debug logging
              console.log('🔍 Cart item debug:', {
                title: item.title,
                imageUrl: item.imageUrl,
                poster: item.poster,
                finalImageSource: imageSource
              });
              
              return (
              <div key={item.movieId} className="cart-item">
                <img 
                  src={imageSource} 
                  alt={item.title} 
                  className="cart-item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/100x150?text=${encodeURIComponent(item.title)}`;
                  }}
                />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p>${(item.price || 9.99).toFixed(2)}</p>
                </div>
                <button 
                  className="nav-button remove-btn" 
                  onClick={() => handleRemoveItem(item.movieId)}
                >
                  Remove
                </button>
              </div>
              );
            })}
          </div>
            <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Items ({cart.items.length}):</span>
                  <span>${getTotalPrice()}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
            <Link to="/checkout">
              <button className="nav-button checkout-btn">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
