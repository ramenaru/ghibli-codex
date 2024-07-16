import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Films from './components/Films';
import FilmDetail from './components/FilmDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-header text-white text-center py-4">
        <h1 className="text-3xl font-bold">Studio Ghibli Codex</h1>
        {currentUser ? (
          <button onClick={logout} className="mt-2 p-2 bg-red-500 text-white rounded">
            Logout
          </button>
        ) : (
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/login" className="p-2 bg-blue-700 text-white rounded">Login</Link>
            <Link to="/signup" className="p-2 bg-green-500 text-white rounded">Sign Up</Link>
          </div>
        )}
      </header>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Films />} />
          <Route path="/film/:id" element={<FilmDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
