import React from 'react';
import { useParams } from 'react-router-dom';
import { useGhibliFilm } from '../hooks/useGhibliFilm';
import { useFavorites } from '../hooks/useFavorites';
import Spinner from './Spinner';

const FilmDetail: React.FC = () => {
  const { id } = useParams();
  const { film, isLoading, isError } = useGhibliFilm(id);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading film details.</div>;

  const isFavorite = favorites.includes(id || '');

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold">{film.title}</h2>
      <p className="text-gray-700">{film.description}</p>
      <p className="text-gray-500">Director: {film.director}</p>
      <p className="text-gray-500">Producer: {film.producer}</p>
      <p className="text-gray-500">Release Date: {film.release_date}</p>
      <p className="text-gray-500">Running Time: {film.running_time} minutes</p>
      <button
        onClick={() => isFavorite ? removeFavorite(id || '') : addFavorite(id || '')}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default FilmDetail;
