import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGhibliFilm } from '../hooks/useGhibliFilm';
import LoadingBar from './LoadingBar';

const FilmDetail: React.FC = () => {
  const { id } = useParams();
  const { film, isLoading, isError } = useGhibliFilm(id);

  if (isLoading) return <LoadingBar />;
  if (isError) return <div>Error loading film details.</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={film.movie_banner} alt={film.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
      <h2 className="text-2xl font-bold">{film.title}</h2>
      <p className="text-gray-700">{film.description}</p>
      <p className="text-gray-500">Director: {film.director}</p>
      <p className="text-gray-500">Producer: {film.producer}</p>
      <p className="text-gray-500">Release Date: {film.release_date}</p>
      <p className="text-gray-500">Running Time: {film.running_time} minutes</p>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Characters</h3>
        <ul className="list-disc pl-5">
          {film.people.map((person: any) => (
            <li key={person.id}>
              <Link to={`/person/${person.id}`} className="text-blue-500 hover:underline">{person.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold">Vehicles</h3>
        <ul className="list-disc pl-5">
          {film.vehicles.map((vehicle: any) => (
            <li key={vehicle.id}>
              <Link to={`/vehicle/${vehicle.id}`} className="text-blue-500 hover:underline">{vehicle.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilmDetail;
