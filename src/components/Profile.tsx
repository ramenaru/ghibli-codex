import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const userContext = useUser();
  const [favoriteTitles, setFavoriteTitles] = useState<{ id: string; title: string; filmId: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user, favorites, removeFavorite } = userContext || { user: null, favorites: [], removeFavorite: () => {} };

  useEffect(() => {
    if (userContext && user) {
      const fetchFavorites = async () => {
        const titles = await Promise.all(
          favorites.map(async (fav) => {
            const response = await fetch(`https://ghibliapi.vercel.app/films/${fav.filmId}`);
            const filmData = await response.json();
            return { id: fav.id, title: filmData.title || 'Unknown Title', filmId: fav.filmId };
          })
        );
        setFavoriteTitles(titles);
        setIsLoading(false);
      };
      fetchFavorites();
    }
  }, [favorites, user, userContext]);

  if (!userContext || !user) {
    return <div>Please log in to view your profile.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <p className="text-gray-700 mb-4">Email: {user.email}</p>
      <h3 className="text-2xl font-bold mb-4">Favorites</h3>
      <ul className="list-disc pl-5">
        {favoriteTitles.map((fav) => (
          <li key={fav.id} className="flex justify-between items-center mb-2">
            <Link to={`/film/${fav.filmId}`} className="text-primary hover:underline">
              {fav.title}
            </Link>
            <button
              onClick={() => removeFavorite(fav.id)}
              className="ml-2 text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
