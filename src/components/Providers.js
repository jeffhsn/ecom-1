'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from '@/src/utils/Store';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <ToastContainer
          position="bottom-center"
          limit={3}
          autoClose={3000}
          closeOnClick
        />
        {children}
      </StoreProvider>
    </SessionProvider>
  );
}
