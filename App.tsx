import React from 'react';
import { AuthProvider } from './src/Context/AuthContext';
import Routes from './src/Routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}