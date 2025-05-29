import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkDetailPage from './pages/WorkDetailPage';
import AuthorsPage from './pages/AuthorsPage';
import ThemesPage from './pages/ThemesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={<PrivateRoute><HomePage /></PrivateRoute>}
            />
            <Route
              path="/work/:id"
              element={<PrivateRoute><WorkDetailPage /></PrivateRoute>}
            />
            <Route
              path="/authors"
              element={<PrivateRoute><AuthorsPage /></PrivateRoute>}
            />
            <Route
              path="/themes"
              element={<PrivateRoute><ThemesPage /></PrivateRoute>}
            />
            <Route
              path="/about"
              element={<PrivateRoute><AboutPage /></PrivateRoute>}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
