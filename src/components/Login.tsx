import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Your username or password is invalid.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error: any) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="flex items-center border rounded p-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Log In</button>
        </form>
        <button onClick={handleGoogleLogin} className="w-full p-2 mt-4 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600 transition duration-200">
          <FaGoogle className="mr-2" /> Log In with Google
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
