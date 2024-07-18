import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGhibliFilms } from '../hooks/useGhibliFilms';
import SearchBar from './SearchBar';
import LoadingBar from './LoadingBar';

const Films: React.FC = () => {
  const { films, isLoading, isError } = useGhibliFilms();
  const [filteredFilms, setFilteredFilms] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState('default');

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
      } else if (sortOrder === 'releaseDate') {
        sortedFilms = sortedFilms.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
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

  if (isLoading) return <LoadingBar isLoading={true} />;
  if (isError) return <div>Error loading films.</div>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-center mb-4">
        <button onClick={() => setSortOrder('default')} className={`p-2 ${sortOrder === 'default' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded m-1`}>Default</button>
        <button onClick={() => setSortOrder('mostPopular')} className={`p-2 ${sortOrder === 'mostPopular' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded m-1`}>Most Popular</button>
        <button onClick={() => setSortOrder('releaseDate')} className={`p-2 ${sortOrder === 'releaseDate' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded m-1`}>Release Date</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentFilms.map((film: any) => (
          <Link to={`/film/${film.id}`} key={film.id} className="card bg-white rounded-lg shadow-md p-4 hover:bg-gray-200 transition">
            <img src={film.image} alt={film.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold">{film.title}</h2>
            <p className="text-gray-700">{film.description}</p>
            <p className="text-gray-500">Director: {film.director}</p>
            <p className="text-gray-500">Release Date: {film.release_date}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredFilms.length / filmsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`p-2 ${currentPage === index + 1 ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded m-1`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Films;
