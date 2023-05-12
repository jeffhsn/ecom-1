'use client';

import { useContext, useEffect, useState } from 'react';
import { Store } from '@utils/Store';
import Link from 'next/link';

const Navbar = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce(
        (accumulator, current) => accumulator + current.quantity,
        0
      )
    );
  }, [cart.cartItems]);

  return (
    <nav className="flex h-12 items-center px-4 justify-between shadow-md">
      <Link href="/" className="text-lg font-bold">
        ecom-1
      </Link>
      <div className="flex items-center z-10">
        <Link href="/cart" className="p-2">
          Cart
          {cartItemsCount > 0 && (
            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
              {cartItemsCount}
            </span>
          )}
        </Link>
        <Link href="/profile" className="p-2">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
