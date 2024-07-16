import React from 'react';
import { useGhibliFilms } from '../hooks/useGhibliFilms';

const Films: React.FC = () => {
  const { films, isLoading, isError } = useGhibliFilms();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading films.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {films.map((film: any) => (
        <div key={film.id} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold">{film.title}</h2>
          <p className="text-gray-700">{film.description}</p>
          <p className="text-gray-500">Director: {film.director}</p>
          <p className="text-gray-500">Release Date: {film.release_date}</p>
        </div>
      ))}
    </div>
  );
}

export default Films;
