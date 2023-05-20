'use client';

import { useContext, useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import { Store } from '@/src/utils/Store';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { status, data: session } = useSession();
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

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

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
        {status === 'loading' ? (
          'Loading'
        ) : session?.user ? (
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="text-blue-600">
              {session.user.name}
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
              <Menu.Item>
                <Link
                  className="dropdown-link hover:bg-gray-200"
                  href="/profile"
                >
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="dropdown-link hover:bg-gray-200"
                  href="/order-history"
                >
                  Order History
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="dropdown-link hover:bg-gray-200"
                  href="#"
                  onClick={logoutClickHandler}
                >
                  Logout
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link href="/login" className="p-2">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
