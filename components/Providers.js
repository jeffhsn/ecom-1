'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from '@utils/Store';

export function Providers({ children }) {
  return (
    <StoreProvider>
      <ToastContainer
        position="bottom-center"
        limit={3}
        autoClose={3000}
        closeOnClick
      />
      {children}
    </StoreProvider>
  );
}
