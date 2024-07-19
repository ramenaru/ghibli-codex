import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center sm:flex-row sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-lg font-bold">🍃 Studio Ghibli Codex</h2>
          <p className="text-sm">© {new Date().getFullYear()} ramenaru All Rights Reserved</p>
        </div>
        <div className="flex gap-4">
          <Link to="https://www.github.com/ramenaru" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-xl hover:text-gray-200" />
          </Link>
          <Link to="https://www.linkedin.com/in/ramenaru" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-xl hover:text-gray-200" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
