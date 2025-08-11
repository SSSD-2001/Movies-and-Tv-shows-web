import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from '../services/api';

function CartIcon({ token }) {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (token) {
        try {
          const cart = await getCart(token);
          setItemCount(cart.items.length);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCartItems();
  }, [token]);

  return (
    <Link to="/cart" className="cart-icon">
      <span className="icon">🛒</span>
      {itemCount > 0 && <span className="badge">{itemCount}</span>}
    </Link>
  );
}

export default CartIcon;