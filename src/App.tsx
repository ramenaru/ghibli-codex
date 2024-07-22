import React, { Suspense, lazy, useState, useRef, useCallback, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoadingBar from './components/Loading/LoadingBar';
import { useAuth } from './context/AuthContext';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import { FiGithub } from 'react-icons/fi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserProvider } from './context/UserContext';
import Footer from './components/Footer';
import ShimmerHeader from './components/Shimmer/ShimmerHeader';
import ShimmerFooter from './components/Shimmer/ShimmerFooter';
import ShimmerBanner from './components/Shimmer/ShimmerBanner';
import quotes from './components/Quotes';

const Films = lazy(() => import('./components/Film/Films'));
const FilmDetail = lazy(() => import('./components/Film/FilmDetail'));
const PersonDetail = lazy(() => import('./components/Detail/PersonDetail'));
const SpeciesDetail = lazy(() => import('./components/Detail/SpeciesDetail'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Profile = lazy(() => import('./components/Profile'));
const NotFound = lazy(() => import('./components/NotFound'));

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const App: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10000);

    return () => clearInterval(interval); 
  }, []);

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<ShimmerHeader />}>
          <header className="bg-blue-500 text-white shadow-lg w-full z-10">
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex flex-row items-center space-x-2 text-sm">
                  <img src="/assets/images/logo/icons144x144.png" alt="logo" className="h-10 w-10" />
                  <span className="text-xl font-bold hidden sm:block md:block">Ghibli Codex</span>
                </Link>
                <nav className="hidden px-4 md:flex space-x-4">
                  <Link to="/" className="text-md hover:text-gray-200 transition-colors duration-300">Home</Link>
                  <Link to="https://ramenaru.me" className="text-md hover:text-gray-200 transition-colors duration-300">About</Link>
                  <a href="https://github.com/ramenaru/ghibli-codex" target="_blank" rel="noopener noreferrer" className="text-md hover:text-gray-200 transition-colors duration-300 flex items-center">
                    <FiGithub className="mr-1" /> GitHub
                  </a>
                </nav>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMusic}
                  className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                >
                  {isMusicPlaying ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
                </button>
                {currentUser ? (
                  <>
                    <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300">
                      Logout
                    </button>
                    <Link to="/profile" className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                      Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">Login</Link>
                    <Link to="/signup" className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300">Sign Up</Link>
                  </>
                )}
                <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none">
                  {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="md:hidden bg-blue-500">
                <nav className="flex flex-col items-center space-y-2 py-2">
                  <Link to="/" className="text-md text-white hover:text-gray-200 transition-colors duration-300" onClick={toggleMobileMenu}>Home</Link>
                  <Link to="https://ramenaru.me" className="text-md text-white hover:text-gray-200 transition-colors duration-300" onClick={toggleMobileMenu}>About</Link>
                  <a href="https://github.com/ramenaru" target="_blank" rel="noopener noreferrer" className="text-md text-white hover:text-gray-200 transition-colors duration-300 flex items-center" onClick={toggleMobileMenu}>
                    <FiGithub className="mr-1" /> GitHub
                  </a>
                </nav>
              </div>
            )}
            <audio ref={audioRef} loop className="hidden">
              <source src="/assets/audio/audio.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </header>
        </Suspense>
        <Suspense fallback={<ShimmerBanner />}>
          <section className="relative">
            <img src="/assets/images/header.webp" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center">
                <blockquote className="text-lg md:text-2xl italic font-semibold text-gray-100">
                  <p>{quote.quote}</p>
                </blockquote>
                <figcaption className="mt-4 text-gray-300">— {quote.source}</figcaption>
              </div>
            </div>
          </section>
        </Suspense>
        <main className="p-4">
          <Suspense fallback={<LoadingBar isLoading={true} />}>
            <Routes>
              <Route path="/" element={<Films />} />
              <Route path="/film/:id" element={<FilmDetail />} />
              <Route path="/person/:id" element={<PersonDetail />} />
              <Route path="/species/:id" element={<SpeciesDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />

              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={<ShimmerFooter />}>
          <Footer />
        </Suspense>
      </div>
    </UserProvider>
  );
}

export default App;
