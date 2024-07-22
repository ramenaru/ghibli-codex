import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGhibliFilmDetail } from '../../hooks/useFilmDetail';
import ShimmerDetailCard from '../Shimmer/ShimmerDetailCard';
import { useUser } from '../../context/UserContext';
import { FaStar, FaHeart } from 'react-icons/fa';
import NotFound from '../NotFound';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { film, isLoading, isError } = useGhibliFilmDetail(id);
  const userContext = useUser();

  const isFavorite = userContext?.favorites.some(fav => fav.filmId === id);

  if (isLoading) {
    return (
      <div className="p-6">
        <ShimmerDetailCard />
      </div>
    );
  }

  if (isError || !film) {
    return <NotFound />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-8">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/3">
          <img src={film.image} alt={film.title} className="w-full h-full object-cover rounded-lg shadow-md mb-4 md:mb-0" />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">{film.title}</h2>
          <h3 className="text-xl mb-2 text-gray-500">{film.original_title} ({film.original_title_romanised})</h3>
          <p className="text-gray-700 mb-4">{film.description}</p>
          <p className="text-gray-500 mb-2"><strong>Director:</strong> {film.director}</p>
          <p className="text-gray-500 mb-2"><strong>Producer:</strong> {film.producer}</p>
          <p className="text-gray-500 mb-2"><strong>Release Date:</strong> {film.release_date}</p>
          <p className="text-gray-500 mb-4"><strong>Running Time:</strong> {film.running_time} minutes</p>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 mr-2" />
            <span className="text-gray-700 font-bold">{film.rt_score}</span>
          </div>
          {userContext && userContext.user ? (
            <button
              onClick={() => isFavorite ? userContext.removeFavorite(userContext.favorites.find(fav => fav.filmId === id)?.id || '') : userContext.addFavorite(id!)}
              className={`p-2 ${isFavorite ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md flex items-center justify-center transition-colors duration-300`}
            >
              <FaHeart className="mr-2" />
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          ) : (
            <div className="text-gray-500">
              <p className="mb-2">To add this film to your favorites, please <Link to="/login" className="text-blue-500 hover:underline">log in</Link>.</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-blue-500">Related Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-2">Characters</h4>
            {film.people.length > 0 ? (
              film.people.map((person: any, index: number) => (
                <Link key={person.id || index} to={`/person/${person.id}`} className="text-blue-500 hover:underline block mb-1">
                  {person.name}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No characters found.</p>
            )}
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Species</h4>
            {film.species.length > 0 ? (
              film.species.map((specie: any, index: number) => (
                <Link key={specie.id || index} to={`/species/${specie.id}`} className="text-blue-500 hover:underline block mb-1">
                  {specie.name}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No species found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
