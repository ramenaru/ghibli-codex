import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import ShimmerProfile from './Shimmer/ShimmerProfile';
import { FaTrashAlt, FaRandom } from 'react-icons/fa';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Profile: React.FC = () => {
  const userContext = useUser();
  const [favoriteTitles, setFavoriteTitles] = useState<{ id: string; title: string; filmId: string; image: string }[]>([]);

  const { user, favorites, removeFavorite } = userContext || {};

  const { data: favoriteFilms, error } = useSWR(
    () => favorites && favorites.length > 0 ? `https://ghibliapi.vercel.app/films?ids=${favorites.map(fav => fav.filmId).join(',')}` : null,
    fetcher
  );

  useEffect(() => {
    if (favoriteFilms && favorites) {
      const titles = favorites.map(fav => {
        const film = favoriteFilms.find((film: any) => film.id === fav.filmId);
        return { id: fav.id, title: film?.title || 'Unknown Title', filmId: fav.filmId, image: film?.image || '/assets/images/default-film.jpg' };
      });
      setFavoriteTitles(titles);
    }
  }, [favoriteFilms, favorites]);

  if (!user) {
    return (
      <div className="text-center text-gray-500">
        Please log in to view your profile.
        <ShimmerProfile />
      </div>
    );
  }

  if (error) {
    return <ShimmerProfile />;
  }

  const handleDiscoverFilms = () => {
    window.location.href = '/film/2baf70d1-42bb-4437-b551-e5fed5a87abe';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-8">
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img src={'/assets/images/default.webp'} alt="Profile" className="w-24 h-24 rounded-full shadow-lg mr-0 sm:mr-4 mb-4 sm:mb-0" />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-800">{user.displayName || 'User'}</h2>
          <p className="text-sm sm:text-base text-gray-600">{user.email}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center md:text-start">Favorite Movies</h3>
      {favoriteTitles.length === 0 ? (
        <div className="text-center sm:text-left text-gray-500">
          <p>You haven't added any favorites yet. Get to discover the films!</p>
          <button
            onClick={handleDiscoverFilms}
            className="mt-4 flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mx-auto md:mx-0 duration-300"
          >
            <FaRandom className="mr-2" />
            Discover Films
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteTitles.map((fav) => (
            <div key={fav.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-lg transition-transform duration-300">
              <Link to={`/film/${fav.filmId}`} className="block">
                <img src={fav.image} alt={fav.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="text-md font-semibold text-gray-800">{fav.title}</h4>
                </div>
              </Link>
              <div className="p-4">
                <button
                  onClick={() => removeFavorite && removeFavorite(fav.id)}
                  className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  <FaTrashAlt className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
