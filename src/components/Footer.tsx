import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center sm:flex-row sm:justify-between">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h2 className="text-2xl font-bold mb-1 flex items-center justify-center sm:justify-start">
            <img src="/assets/images/logo/icons48x48.png" alt="logo" className="h-8 w-8 mr-2" />
            Ghibli Codex
          </h2>
          <p className="text-sm">© {new Date().getFullYear()} ramenaru. All Rights Reserved</p>
        </div>
        <div className="flex gap-4">
          <Link to="https://www.github.com/ramenaru" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-300 transition-colors duration-300">
            <FaGithub />
          </Link>
          <Link to="https://www.linkedin.com/in/ramenaru" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-300 transition-colors duration-300">
            <FaLinkedin />
          </Link>
        </div>
      </div>
      <div className="mt-4 border-t border-blue-400 pt-4 text-center">
        <p className="text-xs text-gray-100">Built with ❤️ by ramenaru</p>
      </div>
    </footer>
  );
};

export default Footer;
