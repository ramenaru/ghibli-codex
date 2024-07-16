import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import LoadingBar from './components/LoadingBar';
import { useAuth } from './context/AuthContext';

const Films = lazy(() => import('./components/Films'));
const FilmDetail = lazy(() => import('./components/FilmDetail'));
const VehicleDetail = lazy(() => import('./components/VehicleDetail'));
const PersonDetail = lazy(() => import('./components/PersonDetail'));
const SpeciesDetail = lazy(() => import('./components/SpeciesDetail'));
const LocationDetail = lazy(() => import('./components/LocationDetail'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));

const App: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white text-center py-4 relative">
        <h1 className="text-3xl font-bold">Studio Ghibli Codex</h1>
        {currentUser ? (
          <button onClick={logout} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded">
            Logout
          </button>
        ) : (
          <div className="absolute top-4 right-4 flex gap-4">
            <Link to="/login" className="p-2 bg-blue-700 text-white rounded">Login</Link>
            <Link to="/signup" className="p-2 bg-green-500 text-white rounded">Sign Up</Link>
          </div>
        )}
        {location.pathname !== "/" && <LoadingBar />}
      </header>
      <main className="p-4">
        <Suspense fallback={<LoadingBar />}>
          <Routes>
            <Route path="/" element={<Films />} />
            <Route path="/film/:id" element={<FilmDetail />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/person/:id" element={<PersonDetail />} />
            <Route path="/species/:id" element={<SpeciesDetail />} />
            <Route path="/location/:id" element={<LocationDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
