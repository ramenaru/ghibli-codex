import React, { Suspense, lazy, useState, useRef, useCallback } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoadingBar from './components/Loading/LoadingBar';
import { useAuth } from './context/AuthContext';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import { UserProvider } from './context/UserContext';
import Footer from './components/Footer';

const Films = lazy(() => import('./components/Film/Films'));
const FilmDetail = lazy(() => import('./components/Film/FilmDetail'));
const VehicleDetail = lazy(() => import('./components/Detail/VehicleDetail'));
const PersonDetail = lazy(() => import('./components/Detail/PersonDetail'));
const SpeciesDetail = lazy(() => import('./components/Detail/SpeciesDetail'));
const LocationDetail = lazy(() => import('./components/Detail/LocationDetail'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Profile = lazy(() => import('./components/Profile'));

const App: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(prevState => !prevState);
    }
  }, [isMusicPlaying]);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-500 text-white text-center py-4 relative flex flex-col items-center sm:flex-row sm:justify-between sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">🍃 Studio Ghibli Codex</h1>
          <audio ref={audioRef} loop className="hidden">
            <source src="/assets/audio/audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="flex items-center">
            <button
              onClick={toggleMusic}
              className="p-2 bg-blue-700 text-white rounded mr-2"
            >
              {isMusicPlaying ? <MdMusicNote /> : <MdMusicOff />}
            </button>
            {currentUser ? (
              <div className="flex gap-2">
                <button onClick={logout} className="p-2 bg-red-500 text-white rounded">
                  Logout
                </button>
                <Link to="/profile" className="p-2 bg-green-500 text-white rounded">
                  Profile
                </Link>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="p-2 bg-blue-700 text-white rounded">Login</Link>
                <Link to="/signup" className="p-2 bg-green-500 text-white rounded">Sign Up</Link>
              </div>
            )}
          </div>
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
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
