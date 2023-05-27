'use client';

import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from '@/src/utils/Store';
import { SessionProvider, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

const Providers = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <ToastContainer
          position="bottom-center"
          limit={3}
          autoClose={3000}
          closeOnClick
        />
        {/* {Component.auth ? (
          <AuthProvider>{...children}</AuthProvider>
        ) : (
          { ...children }
        )} */}

        {children}
      </StoreProvider>
    </SessionProvider>
  );
};

// const AuthProvider = ({ children }) => {
//   const router = useRouter();
//   const { status } = useSession({
//     required: true,
//   });
//   if (status === 'loading') return <div>Loading...</div>;
//   return children;
// };

export default Providers;
