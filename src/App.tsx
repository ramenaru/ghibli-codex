import React, { Suspense, lazy, useState, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import LoadingBar from './components/LoadingBar';
import { useAuth } from './context/AuthContext';
import { FaBell, FaBellSlash } from 'react-icons/fa';

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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-header text-white text-center py-4 relative">
        <h1 className="text-3xl font-bold">Studio Ghibli Codex</h1>
        <audio ref={audioRef} loop>
          <source src="/assets/audio/audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 p-2 bg-blue-700 text-white rounded"
        >
          {isMusicPlaying ? <FaBell /> : <FaBellSlash />}
        </button>
        {currentUser ? (
          <button onClick={logout} className="absolute top-4 right-16 p-2 bg-red-500 text-white rounded">
            Logout
          </button>
        ) : (
          <div className="absolute top-4 right-16 flex gap-4">
            <Link to="/login" className="p-2 bg-blue-700 text-white rounded">Login</Link>
            <Link to="/signup" className="p-2 bg-green-500 text-white rounded">Sign Up</Link>
          </div>
        )}
        {location.pathname !== "/" && <LoadingBar isLoading={true} />}
      </header>
      <main className="p-4">
        <Suspense fallback={<LoadingBar isLoading={true} />}>
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
