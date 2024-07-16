import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGhibliFilms } from '../hooks/useGhibliFilms';
import SearchBar from './SearchBar';
import LoadingBar from './LoadingBar';

const Films: React.FC = () => {
  const { films, isLoading, isError } = useGhibliFilms();
  const [filteredFilms, setFilteredFilms] = useState<any[]>([]);

  useEffect(() => {
    if (films) {
      setFilteredFilms(films);
    }
  }, [films]);

  const handleSearch = (query: string) => {
    if (films) {
      setFilteredFilms(films.filter((film: any) => film.title.toLowerCase().includes(query.toLowerCase())));
    }
  };

  if (isLoading) return <LoadingBar />;
  if (isError) return <div>Error loading films.</div>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFilms.map((film: any) => (
          <Link to={`/film/${film.id}`} key={film.id} className="card bg-white rounded-lg shadow-md p-4 hover:bg-gray-200 transition">
            <h2 className="text-xl font-bold">{film.title}</h2>
            <p className="text-gray-700">{film.description}</p>
            <p className="text-gray-500">Director: {film.director}</p>
            <p className="text-gray-500">Release Date: {film.release_date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Films;
