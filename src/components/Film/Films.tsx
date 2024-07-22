import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGhibliFilms } from '../../hooks/useFilm';
import SearchBar from '../SearchBar';
import ShimmerCard from '../Shimmer/ShimmerCard';
import { FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';

const Films: React.FC = () => {
  const { films, isLoading, isError } = useGhibliFilms();
  const [filteredFilms, setFilteredFilms] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState('default');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState('Filter');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (films) {
      setFilteredFilms(films);
    }
  }, [films]);

  useEffect(() => {
    if (films) {
      let sortedFilms = [...films];
      if (sortOrder === 'mostPopular') {
        sortedFilms = sortedFilms.sort((a, b) => b.rt_score - a.rt_score);
      } else if (sortOrder === 'newest') {
        sortedFilms = sortedFilms.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
      } else if (sortOrder === 'oldest') {
        sortedFilms = sortedFilms.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
      } else {
        sortedFilms = films;
      }
      setFilteredFilms(sortedFilms);
    }
  }, [sortOrder, films]);

  const handleSearch = (query: string) => {
    if (films) {
      setCurrentPage(1);
      setFilteredFilms(films.filter((film: any) => film.title.toLowerCase().includes(query.toLowerCase())));
    }
  };

  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredFilms.length / filmsPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
    setFilterTitle(order === 'default' ? 'Filter' : order.charAt(0).toUpperCase() + order.slice(1));
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isError) return <div>Error loading films.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <SearchBar onSearch={handleSearch} />
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded={isDropdownOpen}>
            {filterTitle}
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-4 max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 sm:w-56">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={() => handleSortOrder('default')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Default</button>
                <button onClick={() => handleSortOrder('mostPopular')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Most Popular</button>
                <div className="border-t border-gray-200"></div>
                <button onClick={() => handleSortOrder('newest')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Newest</button>
                <button onClick={() => handleSortOrder('oldest')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Oldest</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: filmsPerPage }).map((_, index) => <ShimmerCard key={index} />)
        ) : (
          currentFilms.map((film: any) => (
            <div key={film.id} className="bg-white rounded-md shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
              <img src={film.image} alt={film.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{film.title}</h2>
                <h3 className="text-lg text-gray-500 mb-1">{film.original_title}</h3>
                <h4 className="text-sm text-gray-400 mb-4 italic">{film.original_title_romanised}</h4>
                <p className="text-sm text-gray-600 mb-4 truncate">{film.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-500"><strong>Director:</strong> {film.director}</p>
                    <p className="text-gray-500"><strong>Release Date:</strong> {film.release_date}</p>
                  </div>
                  <div className="bg-green-500 text-white text-sm font-semibold rounded-full h-10 w-10 flex items-center justify-center">
                    {film.rt_score}.0
                  </div>
                </div>
                <Link to={`/film/${film.id}`} className="inline-flex items-center justify-center text-sm w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                  <FaInfoCircle className="mr-2" />
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button onClick={prevPage} className="p-2 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600 flex items-center shadow-md transform hover:scale-110 transition-transform duration-300">
          <FaChevronLeft />
        </button>
        {Array.from({ length: Math.ceil(filteredFilms.length / filmsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`text-sm px-3 py-2 ${currentPage === index + 1 ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600 shadow-md transform hover:scale-110 transition-transform duration-300`}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} className="text-sm p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center shadow-md transform hover:scale-110 transition-transform duration-300">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Films;
