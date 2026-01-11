import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';

import Signup from './pages/Signup';

import MainApp from './pages/MainApp';

import { supabase } from './services/api';

import './styles.css';



// Protected Route Component

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);



  useEffect(() => {

    // Check initial session

    supabase.auth.getSession().then(({ data: { session } }) => {

      setIsAuthenticated(!!session);

    });



    // Listen for auth changes

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {

      setIsAuthenticated(!!session);

    });



    return () => subscription.unsubscribe();

  }, []);



  if (isAuthenticated === null) {

    return <div>Loading...</div>;

  }



  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;

};



const App: React.FC = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route 

          path="/chat" 

          element={

            <ProtectedRoute>

              <MainApp />

            </ProtectedRoute>

          } 

        />

        <Route 

          path="/app" 

          element={<Navigate to="/chat" replace />} 

        />

        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>

    </BrowserRouter>

  );

};



export default App;
