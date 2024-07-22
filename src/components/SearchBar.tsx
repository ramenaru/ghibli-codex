import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { FaSearch, FaFilm } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const endpoints = [
    { url: 'https://ghibliapi.vercel.app/films', type: 'film', icon: <FaFilm /> },
  ];

  const { data: films } = useSWR(query.length > 2 ? `${endpoints[0].url}?q=${query}` : null, fetcher);

  const updateSuggestions = useCallback(() => {
    if (films) {
      const allSuggestions = films.map((item: any) => ({ ...item, type: 'film', icon: <FaFilm /> }));
      setSuggestions(allSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
    }
  }, [films]);

  useEffect(() => {
    updateSuggestions();
  }, [films, updateSuggestions]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 pl-10 border border-gray-300 rounded-xl text-sm w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Search films, characters, etc..."
          aria-label="Search"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <FaSearch />
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 text-gray-800 rounded-md mt-2 shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 text-sm hover:bg-gray-200 text-gray-800 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(suggestion.title || suggestion.name)}
            >
              {suggestion.icon}
              <span className="ml-2">{suggestion.title || suggestion.name}</span>
              <span className="ml-auto text-gray-400 text-sm capitalize">{suggestion.type}</span>
            </li>
          ))}
        </ul>
      )}
      {query.length > 2 && !films && (
        <div className="absolute z-10 w-full bg-white border text-gray-800 border-gray-300 rounded-md mt-1 shadow-lg p-2 text-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default SearchBar;
